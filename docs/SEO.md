# SEO implementation notes

Source plan: [VR_Corporation_Website_Structure_and_Local_SEO_Plan.md](./VR_Corporation_Website_Structure_and_Local_SEO_Plan.md)

## What is live on the site today

| Item | Location |
|---|---|
| NAP + business source of truth | `src/data/site.ts` |
| Homepage title / description / keywords | `src/data/site.ts` → `homeSeo` |
| Planned inner-page SEO titles (not published yet) | `src/data/site.ts` → `plannedPageSeo` |
| JSON-LD (`HVACBusiness`, `FAQPage`, `WebPage`) | `src/lib/seo/schema.ts` |
| Meta / Open Graph / Twitter | `src/app/layout.tsx`, `src/app/page.tsx` |
| `robots.txt` | `src/app/robots.ts` |
| `sitemap.xml` | `src/app/sitemap.ts` (homepage only until other pages ship) |

## Rules we follow from the plan

- Homepage primary intent: **Daikin AC dealer in Kharkhoda**
- Do not invent phone, domain, operating days, reviews, ratings, or prices in schema
- Do not publish thin locality / doorway pages
- Create `/daikin-ac/`, `/contact/`, etc. only when each page has real useful content; titles are already drafted in `plannedPageSeo`

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
