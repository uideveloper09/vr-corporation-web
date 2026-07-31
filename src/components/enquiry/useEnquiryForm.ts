"use client";

import { useCallback, useId, useState } from "react";
import { useRouter } from "next/navigation";

import {
  postEnquiry,
  type EnquirySubmitInput,
} from "@/lib/enquiry/clientSubmit";
import type {
  EnquiryFailure,
  RequirementValue,
} from "@/lib/enquiry/types";
import {
  validateEmail,
  validateFullName,
  validateLocality,
  validateMobile,
} from "@/lib/validation";

export type EnquiryCoreField =
  | "fullName"
  | "mobile"
  | "email"
  | "preference"
  | "locality"
  | "consent"
  | "requirement";

export type EnquiryCoreErrors = Partial<Record<EnquiryCoreField, string>>;

export type EnquiryCoreValues = {
  fullName: string;
  mobile: string;
  email: string;
  preference: string;
  locality: string;
  message: string;
  consent: boolean;
  website: string;
  requirement: string;
};

const mapServerFieldErrors = (
  fieldErrors: NonNullable<EnquiryFailure["fieldErrors"]>,
): EnquiryCoreErrors => ({
  fullName: fieldErrors.fullName,
  mobile: fieldErrors.mobile,
  email: fieldErrors.email,
  preference: fieldErrors.contactPreference,
  requirement: fieldErrors.requirement,
  locality: fieldErrors.locality,
  consent: fieldErrors.consent,
});

type UseEnquiryFormOptions = {
  initialRequirement?: string;
  /** When true, requirement is validated as a required select. */
  requireRequirementSelect?: boolean;
  consentErrorMessage?: string;
};

export function useEnquiryForm(options: UseEnquiryFormOptions = {}) {
  const {
    initialRequirement = "",
    requireRequirementSelect = false,
    consentErrorMessage = "Consent is required to send this enquiry.",
  } = options;

  const router = useRouter();
  const formId = useId();

  const [fullName, setFullNameState] = useState("");
  const [mobile, setMobileState] = useState("");
  const [email, setEmailState] = useState("");
  const [preference, setPreferenceState] = useState("");
  const [requirement, setRequirementState] = useState(initialRequirement);
  const [locality, setLocalityState] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsentState] = useState(false);
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<EnquiryCoreErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const values: EnquiryCoreValues = {
    fullName,
    mobile,
    email,
    preference,
    locality,
    message,
    consent,
    website,
    requirement,
  };

  const clearFieldError = useCallback((field: EnquiryCoreField) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  const setFullName = useCallback(
    (value: string) => {
      setFullNameState(value);
      clearFieldError("fullName");
    },
    [clearFieldError],
  );

  const setMobile = useCallback(
    (value: string) => {
      setMobileState(value);
      clearFieldError("mobile");
    },
    [clearFieldError],
  );

  const setEmail = useCallback(
    (value: string) => {
      setEmailState(value);
      clearFieldError("email");
    },
    [clearFieldError],
  );

  const setPreference = useCallback(
    (value: string) => {
      setPreferenceState(value);
      clearFieldError("preference");
    },
    [clearFieldError],
  );

  const setRequirement = useCallback(
    (value: string) => {
      setRequirementState(value);
      clearFieldError("requirement");
    },
    [clearFieldError],
  );

  const setLocality = useCallback(
    (value: string) => {
      setLocalityState(value);
      clearFieldError("locality");
    },
    [clearFieldError],
  );

  const setConsent = useCallback(
    (value: boolean) => {
      setConsentState(value);
      if (value) clearFieldError("consent");
    },
    [clearFieldError],
  );

  const getFieldError = useCallback(
    (field: EnquiryCoreField): string | undefined => {
      switch (field) {
        case "fullName":
          return validateFullName(fullName);
        case "mobile":
          return validateMobile(mobile);
        case "email":
          return validateEmail(email);
        case "preference":
          return preference ? undefined : "Select a preferred contact method.";
        case "requirement":
          if (!requireRequirementSelect) return undefined;
          return requirement ? undefined : "Select your requirement.";
        case "locality":
          return validateLocality(locality);
        case "consent":
          return consent ? undefined : consentErrorMessage;
        default:
          return undefined;
      }
    },
    [
      fullName,
      mobile,
      email,
      preference,
      requirement,
      locality,
      consent,
      requireRequirementSelect,
      consentErrorMessage,
    ],
  );

  const setFieldError = useCallback(
    (field: EnquiryCoreField, error: string | undefined) => {
      setErrors((prev) => {
        if (!error) {
          if (!prev[field]) return prev;
          const next = { ...prev };
          delete next[field];
          return next;
        }
        if (prev[field] === error) return prev;
        return { ...prev, [field]: error };
      });
    },
    [],
  );

  const onFieldBlur = useCallback(
    (field: EnquiryCoreField) => {
      setFieldError(field, getFieldError(field));
    },
    [getFieldError, setFieldError],
  );

  const validateCore = useCallback(
    (extraErrors: EnquiryCoreErrors = {}): EnquiryCoreErrors => {
      const next: EnquiryCoreErrors = { ...extraErrors };
      const fields: EnquiryCoreField[] = [
        "fullName",
        "mobile",
        "email",
        "preference",
        "locality",
        "consent",
      ];
      if (requireRequirementSelect) fields.splice(4, 0, "requirement");

      fields.forEach((field) => {
        const error = getFieldError(field);
        if (error) next[field] = error;
      });
      return next;
    },
    [getFieldError, requireRequirementSelect],
  );

  const mergeServerErrors = useCallback(
    (fieldErrors?: EnquiryFailure["fieldErrors"]) => {
      if (!fieldErrors) return;
      setErrors((prev) => ({ ...prev, ...mapServerFieldErrors(fieldErrors) }));
    },
    [],
  );

  const submit = useCallback(
    async (input: {
      requirement: RequirementValue;
      message: string;
      source?: string;
      /** Override thank-you type; default uses API requestType. */
      thankYouType?: string;
      failMessage?: string;
    }) => {
      setFormError(null);
      setSubmitting(true);

      try {
        const payload: EnquirySubmitInput = {
          fullName,
          mobile,
          email,
          contactPreference: preference,
          requirement: input.requirement,
          locality,
          message: input.message,
          consent,
          source: input.source,
          website,
        };

        const result = await postEnquiry(payload);

        if (!result.ok) {
          mergeServerErrors(result.fieldErrors);
          setFormError(
            result.error ||
              input.failMessage ||
              "Could not send your enquiry. Please try again.",
          );
          return false;
        }

        const type = input.thankYouType ?? result.requestType;
        router.push(`/thank-you?type=${type}&ref=${result.reference}`);
        return true;
      } catch {
        setFormError(
          input.failMessage || "Could not send your enquiry. Please try again.",
        );
        return false;
      } finally {
        setSubmitting(false);
      }
    },
    [
      fullName,
      mobile,
      email,
      preference,
      locality,
      consent,
      website,
      mergeServerErrors,
      router,
    ],
  );

  return {
    formId,
    values,
    errors,
    formError,
    submitting,
    setFullName,
    setMobile,
    setEmail,
    setPreference,
    setRequirement,
    setLocality,
    setMessage,
    setConsent,
    setWebsite,
    setErrors,
    setFormError,
    getFieldError,
    setFieldError,
    clearFieldError,
    onFieldBlur,
    validateCore,
    mergeServerErrors,
    submit,
  };
}

export type UseEnquiryFormReturn = ReturnType<typeof useEnquiryForm>;
