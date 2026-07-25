import { contactVisitData } from "@/data/home/contactVisit";
import { faqData } from "@/data/home/faq";
import { productSolutionsData } from "@/data/home/productSolutions";
import { industrySolutionsData } from "@/data/home/industrySolutions";
import { serviceAreaData } from "@/data/home/serviceArea";
import { coolingPlanData } from "@/data/home/coolingPlan";
import { stayCoolData } from "@/data/home/stayCool";

export type KnowledgeEntry = {
  id: string;
  keywords: string[];
  reply: string;
  suggestions?: string[];
};

const showroomAddress = contactVisitData.address;
const showroomHours = contactVisitData.hours;
const showroomCoords = contactVisitData.coordinates.value;
const mapsLink = contactVisitData.coordinates.mapsHref;
const coolingDeskLabel = contactVisitData.primaryCta.label;
const brandName = contactVisitData.brand.name;
const partnerLine = contactVisitData.brand.partner;
const serviceLocations = serviceAreaData.locations.join(", ");
const phoneHref = contactVisitData.primaryCta.href;
const phoneReady = contactVisitData.whatsapp.ready;
const phoneDisplay = phoneReady
  ? phoneHref.replace(/^tel:/, "")
  : null;
const whatsappHref = contactVisitData.whatsapp.href;
const whatsappReady = contactVisitData.whatsapp.ready;

const productNames = productSolutionsData.cards.map((card) => card.title).join("; ");
const industryNames = industrySolutionsData.cards.map((card) => card.title).join("; ");

const contactReply = phoneDisplay
  ? `Here’s how to reach V R Corporation’s Cooling Desk:\n\n📞 Call: ${phoneDisplay}\n💬 WhatsApp: ${whatsappHref}\n(or tap the green WhatsApp button on the left of the site)\n\nAlso available via “${coolingDeskLabel}” on Visit Us.\n\n📍 ${showroomAddress}\n🕒 ${showroomHours}\n📌 ${showroomCoords}`
  : `You can reach our team in a few easy ways:\n\n📞 Tap “${coolingDeskLabel}” on the Visit Us section\n💬 WhatsApp — use the green button on the left, or ask me “Chat on WhatsApp”\n\n📍 ${showroomAddress}\n🕒 ${showroomHours}\n📌 Coordinates: ${showroomCoords}\n\nMention room type / site visit / AMC so the desk can help faster.`;

const whatsappReply = whatsappReady
  ? `Opening WhatsApp for you — if it didn’t pop up, tap here:\n${whatsappHref}\n\nYou can also use the green WhatsApp button on the left. Share your room size or visit request and the Cooling Desk will take it from there.`
  : `Opening WhatsApp for you — if it didn’t pop up, tap here:\n${whatsappHref}\n\nYou can also use the green WhatsApp button on the left. Once the Cooling Desk number is confirmed on the site, chats go straight to the team. Meanwhile I’m here for sizing, visits, and showroom help.`;


export const chatWelcome = {
  title: "Aria · Cooling Desk",
  subtitle: "Online · replies in seconds",
  greeting: `Hi — I’m Aria, V R Corporation’s cooling assistant. I’m here for ${brandName} (${partnerLine}). Ask me about AC sizing, Daikin options, site visits, AMC, showroom timings, or how to reach the Cooling Desk in Kharkhoda.`,
  suggestions: [
    "Call / contact number",
    "Chat on WhatsApp",
    "Showroom address & timings",
    "Which AC for my room?",
  ],
};

export const chatKnowledge: KnowledgeEntry[] = [
  {
    id: "contact-phone",
    keywords: [
      "call",
      "phone",
      "number",
      "mobile",
      "contact",
      "cooling desk",
      "talk to",
      "speak",
      "ring",
      "telephone",
      "dial",
      "sampark",
      "number do",
      "phone number",
      "contact number",
      "call me",
    ],
    reply: contactReply,
    suggestions: [
      "Chat on WhatsApp",
      "Showroom address & timings",
      "Book a site visit",
    ],
  },
  {
    id: "whatsapp",
    keywords: [
      "whatsapp",
      "whats app",
      "wa.me",
      "chat on whatsapp",
      "message on whatsapp",
      "wp",
      "watsapp",
    ],
    reply: whatsappReply,
    suggestions: [
      "Call / contact number",
      "Book a site visit",
      "Showroom address & timings",
    ],
  },
  {
    id: "maps-directions",
    keywords: [
      "map",
      "maps",
      "google maps",
      "direction",
      "directions",
      "navigate",
      "route",
      "coordinates",
      "gps",
      "location pin",
      "how to reach",
      "kaise pahuche",
    ],
    reply: `Here’s the pin we use on the site — Kharkhoda Coordinates: ${showroomCoords}. Open Maps: ${mapsLink}. Landmark: Near Shri Ram Real Estate, Ward No. 9, Kharkhoda, Sonipat. We’re usually open ${showroomHours.replace("Open ", "")}.`,
    suggestions: [
      "Call / contact number",
      "Showroom address & timings",
      "Book a site visit",
    ],
  },
  {
    id: "showroom",
    keywords: [
      "showroom",
      "timing",
      "timings",
      "open",
      "hours",
      "address",
      "location",
      "kharkhoda",
      "where",
      "visit us",
      "shop",
      "store",
      "office address",
      "kab khulta",
      "address kya",
    ],
    reply: `Our showroom sits in Kharkhoda, Sonipat (Haryana).\n\n📍 ${showroomAddress}\n🕒 ${showroomHours}\n📌 Coordinates: ${showroomCoords}\n\nWalk in with questions — leave with clarity. Need a call instead? Use “${coolingDeskLabel}” on the Visit Us card.`,
    suggestions: [
      "Call / contact number",
      "Open Google Maps",
      "Book a site visit",
    ],
  },
  {
    id: "sizing",
    keywords: [
      "size",
      "sizing",
      "ton",
      "tonnage",
      "room",
      "sqft",
      "sq ft",
      "square",
      "which ac",
      "suitable",
      "capacity",
      "btu",
      "bedroom",
      "living room",
      "kitna ton",
      "kaun sa ac",
    ],
    reply:
      "We match capacity to room size, sunlight and how long the AC runs — so you get comfort without paying for unused power (same guidance as our FAQ).\n\nQuick thumb rule: ~100–120 sq ft often fits around 1 ton; larger or west-facing rooms may need more. Share approx. sq ft + bedroom vs living room, and I’ll point you to a sensible Daikin direction — or we can book a quick site check.",
    suggestions: [
      "Bedroom ~120 sq ft",
      "Living room ~200 sq ft",
      "Book a site visit",
    ],
  },
  {
    id: "bedroom-size",
    keywords: [
      "bedroom",
      "master bedroom",
      "small room",
      "120 sq",
      "bedroom quote",
    ],
    reply:
      "For a typical bedroom around ~100–120 sq ft with normal sunlight, a well-sized ~1 ton inverter split is often the starting conversation — then we fine-tune for west heat, upper floors, or long daily runtime. Want a cleaner answer? Share exact sq ft or book a short site visit.",
    suggestions: ["Book a site visit", "Daikin for home", "Call / contact number"],
  },
  {
    id: "living-size",
    keywords: [
      "living room",
      "living hall",
      "drawing room",
      "200 sq",
      "hall cooling",
    ],
    reply:
      "Living rooms around ~180–220 sq ft (especially with open kitchens or afternoon sun) often need more than a small bedroom unit. We’ll check volume, heat load and duct/pipe run before locking tonnage — that’s how we avoid under-cooling in peak summer.",
    suggestions: ["Book a site visit", "Multi-room options", "Call / contact number"],
  },
  {
    id: "visit",
    keywords: [
      "visit",
      "site visit",
      "survey",
      "inspection",
      "come home",
      "come to my",
      "schedule",
      "appointment",
      "ghar aao",
      "site pe",
    ],
    reply: `Yes — we schedule quick site visits across ${serviceLocations} to assess the space before recommending a plan. We typically check room layout, power point, drain path and outdoor unit placement.\n\nTell me a preferred day/time window, or use “${coolingDeskLabel}” / Visit Us on the site to lock it in.`,
    suggestions: [
      "Service areas",
      "Call / contact number",
      "Showroom instead",
    ],
  },
  {
    id: "amc",
    keywords: [
      "amc",
      "repair",
      "repairs",
      "maintenance",
      "service",
      "care plan",
      "care plans",
      "annual",
      "breakdown",
      "gas",
      "servicing",
      "not cooling",
      "service karo",
    ],
    reply:
      "Yes — we handle AMC and repairs after installation. From annual care plans to seasonal servicing, the team stays available for dependable support (as noted in our FAQ).\n\nTypical care covers filter/coil hygiene checks, performance checks before peak summer, and priority help when something feels off. Want the Cooling Desk to log a request?",
    suggestions: [
      "What’s in a care plan?",
      "Call / contact number",
      "Emergency repair",
    ],
  },
  {
    id: "care-plan-detail",
    keywords: [
      "what s in a care",
      "whats in a care",
      "care plan cover",
      "stay covered",
      "keep it running",
    ],
    reply: `Under Why V R, we focus on four promises: Install It Right, Keep It Running, Stay Covered, and Plan Smarter.\n\nCare plans are meant to keep efficiency high and breakdowns low — season after season — with maintenance + responsive support after switch-on. For your exact unit, the Cooling Desk will map the right plan after a short chat.`,
    suggestions: ["AMC & repairs", "Call / contact number", "Book a site visit"],
  },
  {
    id: "daikin",
    keywords: [
      "daikin",
      "brand",
      "model",
      "inverter",
      "split",
      "cassette",
      "vrv",
      "product",
      "products",
      "authorized",
      "partner",
      "why daikin",
    ],
    reply: `${brandName} is a ${partnerLine}. We bring premium Daikin products with skilled installation and after-sales care — so comfort lasts, not just the first summer.\n\nTell me home, shop, or office and I’ll narrow the right conversation path.`,
    suggestions: ["For home", "For shop / office", "Product options"],
  },
  {
    id: "products-home",
    keywords: [
      "for home",
      "home comfort",
      "residential",
      "house",
      "flat",
      "apartment",
      "multi room",
      "multi-room",
      "ducted",
      "invisible",
      "product options",
      "everyday home",
    ],
    reply: `For homes we typically talk through: ${productNames}.\n\nEveryday Home Comfort for bedrooms/living spaces, Multi-Room Intelligence when you want uniform comfort across rooms, Invisible Ducted Cooling when interiors should stay clean, and Heavy-Duty options when the space is larger. Share your space type and I’ll guide the next step.`,
    suggestions: [
      "Which AC for my room?",
      "Book a site visit",
      "Call / contact number",
    ],
  },
  {
    id: "commercial",
    keywords: [
      "for shop",
      "office",
      "commercial",
      "business",
      "retail",
      "factory",
      "plant",
      "hotel",
      "institution",
      "showroom cooling",
      "corporate",
      "workspace",
    ],
    reply: `For business spaces we tailor Daikin cooling across: ${industryNames}.\n\nGoal is comfort + productivity + efficiency — from quiet offices to robust plant floors. Share industry + approx. area and we’ll outline a planning path (site study → system plan → install → aftercare).`,
    suggestions: [
      "Book a site visit",
      "Call / contact number",
      "Cooling journey steps",
    ],
  },
  {
    id: "journey",
    keywords: [
      "cooling plan",
      "journey",
      "process",
      "steps",
      "how it works",
      "cooling journey",
      "shape my",
      "kaise kaam",
    ],
    reply: `Our cooling journey is simple:\n1) ${coolingPlanData.steps[0].title} — ${coolingPlanData.steps[0].description}\n2) ${coolingPlanData.steps[1].title} — ${coolingPlanData.steps[1].description}\n3) ${coolingPlanData.steps[2].title} — ${coolingPlanData.steps[2].description}\n\nWhen you’re ready, use “Shape My Cooling Plan” on the site or ask me to help start with room details.`,
    suggestions: [
      "Which AC for my room?",
      "Book a site visit",
      "Call / contact number",
    ],
  },
  {
    id: "why-vr",
    keywords: [
      "why vr",
      "why v r",
      "about",
      "trust",
      "company",
      "story",
      "different",
      "kyun",
      "best",
    ],
    reply: `Customers stay with V R because we start with honest advice before a sale, install with finesse, support after switch-on, and keep Daikin expertise nearby in Kharkhoda.\n\nHighlights: ${stayCoolData.items.map((item) => item.title).join(" · ")}. The AC is only the beginning — care continues long after install.`,
    suggestions: [
      "Care plans",
      "Showroom address & timings",
      "Call / contact number",
    ],
  },
  {
    id: "price",
    keywords: [
      "price",
      "cost",
      "budget",
      "quote",
      "quotation",
      "rate",
      "expensive",
      "cheap",
      "offer",
      "discount",
      "kitna",
      "price kya",
      "charge",
    ],
    reply: `Pricing depends on capacity, model series, copper piping run, outdoor placement and installation conditions — a single WhatsApp number rarely tells the full story.\n\nCleanest path: share room type + approx. size (or book a site visit), then get a clear quote without surprise add-ons. You can also tap “${coolingDeskLabel}” for a direct conversation.`,
    suggestions: [
      "Bedroom quote path",
      "Book a site visit",
      "Call / contact number",
    ],
  },
  {
    id: "area",
    keywords: [
      "sonipat",
      "service area",
      "areas",
      "near me",
      "rohtak",
      "nearby",
      "cover",
      "deliver",
      "installation area",
      "kahan",
    ],
    reply: `${serviceAreaData.description}\n\nPrimary coverage: ${serviceLocations}. If you’re just outside the usual radius, tell me your locality — I’ll be honest about feasibility and the best next step.`,
    suggestions: [
      "Book a site visit",
      "Showroom address & timings",
      "Call / contact number",
    ],
  },
  {
    id: "install",
    keywords: [
      "install",
      "installation",
      "fitting",
      "mount",
      "lagwana",
      "install it right",
      "dust",
    ],
    reply:
      "Installation is a core part of what we do — professional fitment that protects performance from day one, with a clean, low-hassle finish. Piping, drain, electrical readiness and outdoor unit placement all matter as much as the indoor unit. Want us to assess before install day?",
    suggestions: ["Book a site visit", "AMC after install", "Call / contact number"],
  },
  {
    id: "faq-mirror",
    keywords: ["faq", "common question", "before you switch", "doubt"],
    reply: `Quick answers from our FAQ:\n• ${faqData.items[0].question} — ${faqData.items[0].answer}\n• ${faqData.items[1].question} — ${faqData.items[1].answer}\n• ${faqData.items[2].question} — ${faqData.items[2].answer}`,
    suggestions: [
      "Which AC for my room?",
      "Book a site visit",
      "AMC & repairs",
    ],
  },
  {
    id: "hello",
    keywords: [
      "hi",
      "hello",
      "hey",
      "namaste",
      "good morning",
      "good evening",
      "hola",
      "namaskar",
    ],
    reply: `Hello! I’m Aria at the Cooling Desk for ${brandName}. I can help with sizing, Daikin options, visits, AMC, showroom timings, or how to call the team. What’s on your mind?`,
    suggestions: [
      "Call / contact number",
      "Which AC for my room?",
      "Showroom address & timings",
    ],
  },
  {
    id: "thanks",
    keywords: ["thank", "thanks", "thx", "helpful", "great", "ok thanks", "shukriya", "dhanyavad"],
    reply:
      "Glad that helped. Anytime you want sizing, a visit, showroom details, or the Cooling Desk line — I’m right here.",
    suggestions: [
      "Call / contact number",
      "Book a site visit",
      "Showroom address & timings",
    ],
  },
  {
    id: "human",
    keywords: [
      "human",
      "person",
      "agent",
      "executive",
      "manager",
      "real person",
      "someone",
      "insaan",
    ],
    reply: `Absolutely — for a live conversation with the team, use “${coolingDeskLabel}” on the Visit Us section, or walk into the Kharkhoda showroom (${showroomHours}). I can also prep your questions so the call goes faster.`,
    suggestions: [
      "Call / contact number",
      "Showroom address & timings",
      "Book a site visit",
    ],
  },
];

export const chatFallback = {
  reply: `I want to guide you correctly for ${brandName}. I can help with contact / WhatsApp, showroom address & timings (${showroomHours}), AC sizing, Daikin product direction, site visits across ${serviceLocations}, AMC/repairs, or commercial cooling. Rephrase in one line — or pick an option below.`,
  suggestions: [
    "Call / contact number",
    "Chat on WhatsApp",
    "Showroom address & timings",
    "Which AC for my room?",
  ],
};
