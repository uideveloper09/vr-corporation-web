import fs from "node:fs";
import path from "node:path";
import https from "node:https";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const cacheDir = path.join(process.env.TEMP || "/tmp", "daikin-cats-v2");
const outJson = path.join(root, "src/data/products/daikinProducts.json");

const categories = [
  {
    id: "split",
    name: "Split",
    path: "/product-category/splitac",
    description: "Wall-mounted split air conditioners for homes and compact spaces.",
  },
  {
    id: "cassette",
    name: "Cassette",
    path: "/product-category/cassette",
    description: "Ceiling cassette units for even airflow in open rooms and retail floors.",
  },
  {
    id: "floor-standing",
    name: "Floor Standing",
    path: "/products-services/floor-standing",
    description: "Floor-standing indoor units for larger rooms and commercial areas.",
  },
  {
    id: "ducted",
    name: "Ducted",
    path: "/product-category/ducted-air-conditioner",
    description: "Concealed ducted systems for clean interiors and even cooling.",
  },
  {
    id: "vrv",
    name: "VRV",
    path: "/product-category/vrv-air-conditioner",
    description: "Variable refrigerant systems for multi-zone homes and commercial floors.",
  },
  {
    id: "chillers",
    name: "Chillers",
    path: "/product-category/chillers",
    description: "Chiller plant equipment for large commercial and industrial facilities.",
  },
  {
    id: "refrigeration",
    name: "Refrigeration",
    path: "/cold-chain-solution",
    description: "Commercial refrigeration and cold-chain solutions.",
  },
  {
    id: "roof-top",
    name: "Roof Top",
    path: "/products-services/roof-top",
    description: "Packaged roof-top units for commercial buildings.",
  },
  {
    id: "fcu",
    name: "FCU",
    path: "/product-category/fcu",
    description: "Fan coil units for chilled-water and central-plant buildings.",
  },
  {
    id: "ceiling-suspended",
    name: "Ceiling Suspended - One Way",
    path: "/product-category/ceiling-suspended-one-way",
    description: "One-way ceiling suspended units for directed airflow zones.",
  },
  {
    id: "control-systems",
    name: "Control Systems",
    path: "/product-category/control-systems",
    description: "Controllers and building controls for Daikin installations.",
  },
  {
    id: "air-purifier",
    name: "Air Purifier",
    path: "/product-category/air-purifier-0",
    description: "Air purifiers for cleaner indoor air alongside cooling.",
  },
];

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            Accept: "text/html",
          },
        },
        (res) => {
          if (
            res.statusCode &&
            res.statusCode >= 300 &&
            res.statusCode < 400 &&
            res.headers.location
          ) {
            const next = new URL(res.headers.location, url).toString();
            res.resume();
            fetchText(next).then(resolve, reject);
            return;
          }

          const chunks = [];
          res.on("data", (c) => chunks.push(c));
          res.on("end", () => {
            resolve({
              status: res.statusCode || 0,
              html: Buffer.concat(chunks).toString("utf8"),
            });
          });
        },
      )
      .on("error", reject);
  });
}

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&deg;/g, "°")
    .replace(/&nbsp;/g, " ")
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function stripTags(value) {
  return decodeHtml(value.replace(/<[^>]+>/g, " "));
}

function pick(html, patterns) {
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return decodeHtml(match[1]);
  }
  return "";
}

function absoluteUrl(maybeUrl) {
  if (!maybeUrl) return "";
  if (maybeUrl.startsWith("http")) return maybeUrl;
  if (maybeUrl.startsWith("node/")) {
    return `https://daikinindia.com/${maybeUrl}`;
  }
  return `https://daikinindia.com${maybeUrl.startsWith("/") ? "" : "/"}${maybeUrl}`;
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function extractLabeled(block, label) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return pick(block, [
    new RegExp(`${escaped}:\\s*</span>\\s*<div class="field-content[^"]*">([^<]+)`, "i"),
    new RegExp(`${escaped}:[\\s\\S]*?field-content[^>]*>\\s*([^<]+)`, "i"),
  ]);
}

function parseCardBlock(block, category) {
  const href =
    pick(block, [
      /<h[23][^>]*>\s*<a[^>]+href="([^"]+)"/i,
      /list-prd-knowmore[^>]+href="([^"]+)"/i,
      /<a[^>]+href="((?:\/product-category\/|\/products-services\/|\/cold-chain|\/control-systems|node\/)[^"]+)"/i,
    ]) || category.path;

  const name = stripTags(
    pick(block, [
      /<h[23][^>]*>\s*<a[^>]*>([\s\S]*?)<\/a>/i,
      /<h[23][^>]*class="[^"]*dl-H3[^"]*"[^>]*>([\s\S]*?)<\/h[23]>/i,
      /rel="([^"]+)"/i,
      /title="([^"]+)"/i,
      /alt="([^"]+)"/i,
    ]),
  );
  if (!name || name.length > 120) return null;
  if (/product lineup|related|find my ac/i.test(name)) return null;

  const image = pick(block, [
    /views-field-field-product-logo[\s\S]*?<img[^>]+src="([^"]+)"/i,
    /<img[^>]+src="([^"]*product%20logo[^"]*)"/i,
    /<img[^>]+src="([^"]+)"/i,
  ]);

  const summary =
    stripTags(
      pick(block, [
        /views-field-field-series-short-description[\s\S]*?<p>([\s\S]*?)<\/p>/i,
        /views-field-body[\s\S]*?<p>([\s\S]*?)<\/p>/i,
        /<p>([\s\S]*?)<\/p>/i,
      ]),
    ) || `${name} from Daikin ${category.name} range.`;

  return {
    id: `${category.id}-${slugify(name)}`,
    name,
    summary,
    starRating:
      extractLabeled(block, "Star Rating") ||
      pick(block, [/views-field-field-star-rating[\s\S]*?field-content">([^<]+)/i]) ||
      null,
    capacity:
      extractLabeled(block, "kW (Tr)") ||
      extractLabeled(block, "Available in (kW)") ||
      pick(block, [/views-field-field-(?:tonnage|category-tonnage)[\s\S]*?field-content">([^<]+)/i]) ||
      null,
    technology:
      extractLabeled(block, "Technology") ||
      extractLabeled(block, "Type") ||
      pick(block, [/views-field-field-(?:product-type-inv|inverter-type)[\s\S]*?field-content">([^<]+)/i]) ||
      null,
    series:
      extractLabeled(block, "Series") ||
      pick(block, [/views-field-field-ra-series-name[\s\S]*?field-content[^>]*>\s*([^<]+)/i]) ||
      null,
    image: absoluteUrl(image),
    sourceUrl: absoluteUrl(href),
  };
}

function parseProducts(html, category) {
  const products = [];
  const seen = new Set();

  const lineupStart = html.search(/product-lineup|view-product-sublist|view-content/i);
  const scope = lineupStart >= 0 ? html.slice(lineupStart) : html;

  const blocks = [
    ...scope.matchAll(
      /<div class="[^"]*(?:dl-Grid--Col|dl-Grid__Col)[^"]*"[^>]*>[\s\S]*?<h[23][\s\S]*?<\/(?:div>\s*){2,6}/gi,
    ),
  ];

  for (const match of blocks) {
    const product = parseCardBlock(match[0], category);
    if (!product) continue;
    const key = product.name.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    products.push(product);
  }

  // Fallback: any titled product/series heading inside product sections
  if (products.length === 0) {
    const titles = [
      ...scope.matchAll(
        /<h[23][^>]*>\s*(?:<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>|([^<][\s\S]*?))<\/h[23]>/gi,
      ),
    ];
    for (const match of titles) {
      const aroundStart = Math.max(0, match.index - 200);
      const around = scope.slice(aroundStart, aroundStart + 2500);
      const product = parseCardBlock(around, category);
      if (!product) continue;
      const key = product.name.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      products.push(product);
    }
  }

  return products;
}

async function loadCategoryHtml(category) {
  fs.mkdirSync(cacheDir, { recursive: true });
  const cacheFile = path.join(cacheDir, `${category.id}.html`);
  const url = `https://daikinindia.com${category.path}`;

  const { status, html } = await fetchText(url);
  if (status === 200 && html.length > 5000) {
    fs.writeFileSync(cacheFile, html, "utf8");
  }
  return { status, html, url };
}

async function main() {
  const catalog = {
    source: "https://daikinindia.com/product-category",
    generatedAt: new Date().toISOString(),
    note: "Category-wise Daikin India product/series snapshot for VR Corporation products page. Product images remain hosted on daikinindia.com.",
    categories: [],
  };

  for (const category of categories) {
    process.stdout.write(`Fetching ${category.name}... `);
    const { status, html, url } = await loadCategoryHtml(category);
    const products = status === 200 ? parseProducts(html, category) : [];
    console.log(`${status} → ${products.length}`);

    catalog.categories.push({
      id: category.id,
      name: category.name,
      path: category.path,
      sourceUrl: url,
      description: category.description,
      productCount: products.length,
      products,
    });
  }

  fs.mkdirSync(path.dirname(outJson), { recursive: true });
  fs.writeFileSync(outJson, `${JSON.stringify(catalog, null, 2)}\n`, "utf8");

  console.log(`\nWrote ${outJson}`);
  console.log(
    `Total products: ${catalog.categories.reduce((sum, c) => sum + c.products.length, 0)}`,
  );
  for (const category of catalog.categories) {
    console.log(`- ${category.name}: ${category.productCount}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
