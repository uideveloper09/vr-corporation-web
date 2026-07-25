type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

/** Renders JSON-LD for search engines. Safe for server components. */
const JsonLd = ({ data }: JsonLdProps) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);

export default JsonLd;
