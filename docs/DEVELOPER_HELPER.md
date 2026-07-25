# V R Corporation Website — Developer Helper

## 1. Handoff purpose

This folder is the visual source of truth for the V R Corporation static website homepage. Build every section as real semantic HTML/CSS/components. Do not publish the mockup PNG files as one long webpage image.

- `00_approved_full_page_reference.png` shows the approved overall flow.
- Files `01` through `14` provide enlarged section-level implementation references.
- When a small visual detail differs, follow the section-level image for layout and the verified facts in this file for content.

## 2. Verified business information

| Field | Production value |
|---|---|
| Business | V R Corporation |
| Positioning | Daikin Authorized Partner |
| Contact person | Vikas Sehrawat |
| Address | Ward No. 9, Near Shri Ram Real Estate, Kharkhoda, Sonipat, Haryana – 131402 |
| Coordinates | 28.8674698, 76.9061127 |
| Google Maps URL | https://www.google.com/maps?q=28.867469787597656,76.90611267089844&z=17&hl=en |
| Opening hours | 10:00 AM–7:00 PM |
| Phone / WhatsApp | Placeholder until client confirms final numbers |
| Domain | Placeholder until client confirms final domain |
| Google Business Profile | Not yet created |

Do not infer operating days. Do not publish a temporary phone number or dummy domain as real contact information.

## 3. Asset and section index

| File | Section | Implementation note |
|---|---|---|
| `01_header_hero_trust_strip.png` | Header, hero and trust strip | The only desktop header. Use one H1. Preserve dual VR Corporation and Daikin partner identity. |
| `02_section_01_product_solutions.png` | Product solutions | Four solution cards: home split/inverter, multi-room VRV/VRF, ducted, and heavy-duty/chiller-AHU. |
| `03_section_02_industry_solutions.png` | Industry solutions | Commercial use cases: offices, retail/showrooms, factories/plants, hotels/institutions. |
| `04_section_03_services_care.png` | Services and care | Installation, maintenance/AMC, protection/support, and planning/consultancy. |
| `05_section_04_consultation_process.png` | Consultation process | Three-step horizontal journey; stack vertically on mobile. |
| `06_section_05_showroom_story.png` | Local showroom story | Use the cleaned/cropped showroom visual; do not reintroduce neighboring shops. |
| `07_section_06_why_choose_vr.png` | Why choose VR | Four concise benefit items. |
| `08_section_07_customer_reviews.png` | Review placeholder | Honest placeholder only until verified reviews exist. |
| `09_section_08_client_showcase.png` | Client showcase | Desktop carousel; responsive swipe list on mobile. |
| `10_section_09_service_area.png` | Service area | Kharkhoda, Sonipat and nearby areas. Link the map action to the verified URL. |
| `11_section_10_faq.png` | FAQ | Accessible accordion with keyboard controls. |
| `12_section_11_final_cta.png` | Final CTA | Premium navy airflow panel and two actions. |
| `13_section_12_contact_location.png` | Contact and location | Use exact address, coordinates and hours from this file. |
| `14_section_13_footer.png` | Footer | Phone/domain remain clearly marked until confirmed. Copyright year should be generated dynamically. |

## 4. Recommended design tokens

The mockups are visual references, so sample and refine colors during implementation. Start with these CSS variables:

```css
:root {
  --vr-navy-950: #03182f;
  --vr-navy-900: #06223f;
  --vr-blue-600: #0877d1;
  --vr-blue-500: #0a84f7;
  --vr-cyan-400: #19b8e8;
  --vr-ice-100: #eaf6fc;
  --vr-surface: #ffffff;
  --vr-text: #082a4d;
  --vr-muted: #527089;
  --vr-border: #cfe3f1;
  --vr-shadow: 0 16px 40px rgb(3 24 47 / 12%);
  --vr-radius-card: 20px;
  --vr-radius-panel: 28px;
  --vr-container: 1440px;
}
```

- Recommended font: `Inter`, with a system sans-serif fallback.
- Headings: 700–800 weight, tight line-height around 1.05–1.15.
- Body: 400–500 weight, line-height around 1.55–1.7.
- Desktop content width: maximum 1440px with 64–80px side padding.
- Section spacing: 96–120px desktop, 64–80px tablet, 48–64px mobile.
- Keep shadows subtle. Interactive cards may lift by no more than 4px over 180–220ms.

## 5. Responsive rules

- Breakpoints to test: 1440px, 1280px, 1024px, 768px, 480px and 360px.
- Collapse desktop navigation below 1024px into an accessible menu.
- Hero becomes a single column on tablet/mobile; copy and primary CTA appear before artwork.
- Four-card rows become two columns on tablet and one column on mobile.
- Consultation steps become a vertical timeline on mobile.
- Client logos become a touch-friendly slider with previous/next controls and swipe support.
- Contact actions should become full-width stacked buttons on mobile.
- Avoid fixed section heights. Preserve rhythm using padding and content-driven sizing.

## 6. Content and interaction rules

- Keep distinctive CTA language from the approved visuals. Avoid replacing every action with generic “Get a Quote”.
- Configure phone, WhatsApp and domain once through a single site configuration object or environment file.
- `tel:` and WhatsApp links must remain disabled or hidden until the final numbers are confirmed.
- Map actions must use the verified Google Maps URL in Section 2.
- The FAQ accordion must expose `aria-expanded`, associate controls with panels and work by keyboard.
- A client carousel must pause on hover/focus, support manual controls and respect `prefers-reduced-motion`.
- Icons need accessible names when they act as controls; decorative icons should be hidden from assistive technology.
- All informative images need meaningful alt text. Use empty alt text for decorative airflow/3D shapes.

## 7. Reviews and client-logo integrity

- Do not publish fabricated reviews, customer names, star ratings or borrowed testimonials.
- Keep the review placeholders shown in the mockup until the Google Business Profile exists and feedback is verified.
- Replace placeholder review cards only with approved, traceable customer feedback.
- The client names requested for the showcase are: Suzuki Motorcycles Kharkhoda, Bellsonica, KML Seat, Polyplastic India, Takenaka India Pvt Ltd and Meneta.
- Obtain official, approved SVG/PNG logo assets from the client before production. Mockup logos are layout references, not a production trademark asset pack.
- Follow Daikin authorization and brand-usage guidelines for its logo, colors and partner wording.

## 8. SEO implementation baseline

- Use one descriptive H1 in the hero, then H2 headings for major sections and H3 headings for cards.
- Suggested homepage title: `Daikin AC Dealer in Kharkhoda, Sonipat | V R Corporation`.
- Suggested meta description: `Explore Daikin air conditioning solutions, installation, AMC, repair and HVAC consultancy from V R Corporation in Kharkhoda, Sonipat.`
- Keep the same business name, address, map pin and hours across the website and future Google Business Profile.
- Add `LocalBusiness` or the most accurate eligible subtype schema only after final phone, URL, operating days and business-profile details are verified.
- Add `FAQPage` structured data only when the visible FAQ copy matches it exactly and remains eligible under current search-engine guidelines.
- Generate `sitemap.xml`, `robots.txt`, canonical URL, Open Graph metadata and descriptive image metadata after the domain is finalized.
- Local rankings cannot be guaranteed by the website alone. Google Business Profile verification, category accuracy, NAP consistency, genuine reviews, proximity and ongoing profile activity are also required.

## 9. Performance baseline

- Convert production photography to responsive AVIF/WebP with width/height attributes.
- Keep logos as optimized SVG when official vectors are available.
- Preload only the true hero/LCP image and defer below-the-fold imagery.
- Target Core Web Vitals: LCP below 2.5s, INP below 200ms and CLS below 0.1 under normal field conditions.
- Avoid large animation libraries for decorative airflow. Prefer lightweight CSS or optimized SVG.

## 10. Pre-launch checklist

- [ ] Final domain confirmed and applied to metadata/canonical/schema.
- [ ] Final phone and WhatsApp numbers confirmed and tested.
- [ ] Operating days confirmed.
- [ ] Official VR Corporation and Daikin partner logo files approved.
- [ ] Client logos supplied and trademark usage approved.
- [ ] Google Business Profile created, verified and linked.
- [ ] Reviews replaced only after verification.
- [ ] Address and map pin tested on desktop and mobile.
- [ ] Responsive layouts checked at all listed breakpoints.
- [ ] Keyboard, focus, contrast and reduced-motion checks passed.
- [ ] Lighthouse/performance and broken-link checks passed.

## 11. Final implementation note

The mockups were generated as high-resolution visual direction. Recreate the layout responsively rather than matching pixels at one viewport. Verified facts in this helper override any accidental text variation visible inside an image.
