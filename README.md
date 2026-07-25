# V R Corporation Web

Marketing website for **V R Corporation** — Daikin Authorized Partner in Kharkhoda, Sonipat.

## Stack

- Next.js
- React
- TypeScript
- Custom CSS

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev    # local development
npm run build  # production build
npm run start  # serve production build
```

## Docs

| Doc | Purpose |
|---|---|
| [docs/SEO.md](docs/SEO.md) | What SEO is implemented + launch checklist |
| [docs/DEVELOPER_HELPER.md](docs/DEVELOPER_HELPER.md) | Verified business facts + section build notes |
| [docs/VR_Corporation_Website_Structure_and_Local_SEO_Plan.md](docs/VR_Corporation_Website_Structure_and_Local_SEO_Plan.md) | Full website structure & local SEO plan |

## Notes

- Business NAP / SEO source of truth: `src/data/site.ts`
- Before launch, set `NEXT_PUBLIC_SITE_URL` (see `.env.example`) and confirm phone in `src/data/site.ts`
- WhatsApp / call behaviour also uses `src/data/home/contactVisit.ts` (synced from site config)
- Chat knowledge: `src/components/chat/chatKnowledge.ts`
- Optional live chat API: set `NEXT_PUBLIC_CHAT_API_URL`
