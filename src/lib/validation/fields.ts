/**
 * Shared field validators for forms and API routes.
 * Return an error message, or `undefined` when valid.
 */

export type FieldValidationOptions = {
  required?: boolean;
};

const DEFAULT_REQUIRED = true;

const isBlank = (value: string) => !value.trim();

/** Letters (Latin + unicode letters), spaces, apostrophe, hyphen, period. */
const FULL_NAME_PATTERN =
  /^[\p{L}][\p{L}\s'.-]{0,88}[\p{L}.]?$/u;

const EMAIL_PATTERN =
  /^[a-zA-Z0-9](?:[a-zA-Z0-9._%+-]{0,62}[a-zA-Z0-9])?@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})+$/;

export const normalizeFullName = (value: string) =>
  value.trim().replace(/\s+/g, " ");

export const normalizeMobile = (value: string) => {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) {
    return digits.slice(2);
  }
  if (digits.length === 11 && digits.startsWith("0")) {
    return digits.slice(1);
  }
  return digits;
};

export const normalizeEmail = (value: string) => value.trim().toLowerCase();

export const normalizeLocality = (value: string) =>
  value.trim().replace(/\s+/g, " ");

export const validateFullName = (
  value: string,
  options: FieldValidationOptions = {},
): string | undefined => {
  const required = options.required ?? DEFAULT_REQUIRED;
  const normalized = normalizeFullName(value);

  if (isBlank(normalized)) {
    return required ? "Please enter your full name." : undefined;
  }

  if (normalized.length < 4) {
    return "Name must be at least 4 characters.";
  }

  if (normalized.length > 90) {
    return "Name must be 90 characters or fewer.";
  }

  if (/\d/.test(normalized)) {
    return "Name cannot include numbers.";
  }

  if (!FULL_NAME_PATTERN.test(normalized)) {
    return "Enter a valid name using letters only.";
  }

  if ((normalized.match(/\s/g) ?? []).length > 4) {
    return "Please enter a shorter full name.";
  }

  return undefined;
};

export const validateMobile = (
  value: string,
  options: FieldValidationOptions = {},
): string | undefined => {
  const required = options.required ?? DEFAULT_REQUIRED;
  const raw = value.trim();

  if (isBlank(raw)) {
    return required ? "Please enter your mobile number." : undefined;
  }

  const normalized = normalizeMobile(raw);

  if (!/^\d+$/.test(normalized)) {
    return "Mobile number can only include digits.";
  }

  if (normalized.length !== 10) {
    return "Enter a valid 10-digit mobile number.";
  }

  if (!/^[6-9]/.test(normalized)) {
    return "Mobile number must start with 6, 7, 8 or 9.";
  }

  if (/^(\d)\1{9}$/.test(normalized)) {
    return "Enter a valid mobile number.";
  }

  return undefined;
};

export const validateEmail = (
  value: string,
  options: FieldValidationOptions = {},
): string | undefined => {
  const required = options.required ?? DEFAULT_REQUIRED;
  const normalized = normalizeEmail(value);

  if (isBlank(normalized)) {
    return required ? "Please enter your email address." : undefined;
  }

  if (normalized.length > 120) {
    return "Email must be 120 characters or fewer.";
  }

  if (normalized.includes("..")) {
    return "Enter a valid email address.";
  }

  if (!EMAIL_PATTERN.test(normalized)) {
    return "Enter a valid email address.";
  }

  return undefined;
};

export const validateLocality = (
  value: string,
  options: FieldValidationOptions = {},
): string | undefined => {
  const required = options.required ?? DEFAULT_REQUIRED;
  const normalized = normalizeLocality(value);

  if (isBlank(normalized)) {
    return required ? "Please enter your locality." : undefined;
  }

  if (normalized.length < 2) {
    return "Locality must be at least 2 characters.";
  }

  if (normalized.length > 80) {
    return "Locality must be 80 characters or fewer.";
  }

  if (!/[\p{L}]/u.test(normalized)) {
    return "Enter a valid locality name.";
  }

  return undefined;
};

/** Boolean helpers when only pass/fail is needed. */
export const isValidFullName = (value: string) => !validateFullName(value);
export const isValidMobile = (value: string) => !validateMobile(value);
export const isValidEmail = (value: string) => !validateEmail(value);
export const isValidLocality = (value: string) => !validateLocality(value);
