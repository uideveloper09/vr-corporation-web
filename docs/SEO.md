# SEO implementation notes

Source plan: [VR_Corporation_Website_Structure_and_Local_SEO_Plan.md](./VR_Corporation_Website_Structure_and_Local_SEO_Plan.md)

Solutions page SEO copy source: `VR_Corporation_Solutions_Pages_Designer_Handoff/03_Designer_Specs/SEO_AND_LOCAL_CONTENT_SPEC.md`

Other pages SEO/indexing source: `VR_Corporation_Other_Pages_Designer_Handoff/03_Designer_Specs/SEO_AND_INDEXING_SPEC.md`

## What is live on the site today

| Item | Location |
|---|---|
| NAP + business source of truth | `src/data/site.ts` |
| Homepage title / description / keywords | `src/data/site.ts` → `homeSeo` |
| Published + planned page SEO titles | `src/data/site.ts` → `plannedPageSeo` |
| Page-level SEO data (live routes) | `src/data/pages/*` |
| JSON-LD (`HVACBusiness`, `FAQPage`, `WebPage`) | `src/lib/seo/schema.ts` (home only) |
| Meta / Open Graph / Twitter | `src/app/layout.tsx`, route `page.tsx` files |
| `robots.txt` | `src/app/robots.ts` |
| `sitemap.xml` | `src/app/sitemap.ts` |

## Published indexable routes

| Route | Primary intent |
|---|---|
| `/` | Daikin AC dealer in Kharkhoda |
| `/cooling-solutions` | Daikin cooling solutions / AC dealer Kharkhoda |
| `/ac-service-amc` | AC service, repair, installation, AMC |
| `/commercial-cooling-solutions` | Commercial AC / VRV VRF / HVAC |
| `/about-us` | Local Daikin partner credibility |
| `/contact-us` | Showroom NAP + enquiry |
| `/privacy-policy` | Privacy (footer + sitemap) |
| `/terms-and-disclaimer` | Terms (footer + sitemap) |

## Non-index / helper routes

| Route | Behaviour |
|---|---|
| `/thank-you` | `noindex, nofollow`; excluded from sitemap; no PII in URL |
| `/find-my-ideal-ac` | Ideal-AC guidance + short help form |
| `/site-visit` | Site visit / commercial site-study request form |

## Rules we follow from the plan / handoffs

- Homepage primary intent: **Daikin AC dealer in Kharkhoda** — other pages use distinct intents (no cannibalization)
- One H1, unique title, unique meta description, canonical per indexable page
- Do not invent phone, domain, operating days, reviews, ratings, or prices in schema
- Do not publish thin locality / doorway pages
- No product / service / review schema until real verified data exists
- `LocalBusiness` / `HVACBusiness` fields stay limited to confirmed NAP data
- Query filters (`?type=`, `?service=`, `?industry=`) keep the base-path canonical

## Before launch

1. Set `NEXT_PUBLIC_SITE_URL` in `.env` (see `.env.example`)
2. In `src/data/site.ts`, set the real phone and flip `phone.ready` to `true`
3. Confirm operating days, then add `openingHoursSpecification` to schema
4. Confirm email / service-area list if needed
5. Submit `sitemap.xml` in Google Search Console after the final domain is live
6. Create / verify Google Business Profile with the same NAP as `site.ts`

## Related docs

- Visual / content handoff: [DEVELOPER_HELPER.md](./DEVELOPER_HELPER.md)
- Full local SEO blueprint: [VR_Corporation_Website_Structure_and_Local_SEO_Plan.md](./VR_Corporation_Website_Structure_and_Local_SEO_Plan.md)
