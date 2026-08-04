import daikinProductsJson from "@/data/products/daikinProducts.json";

export type DaikinProduct = {
  id: string;
  name: string;
  summary: string;
  starRating: string | null;
  capacity: string | null;
  technology: string | null;
  series: string | null;
  image: string;
  sourceUrl: string;
};

export type DaikinProductCategory = {
  id: string;
  name: string;
  path: string;
  sourceUrl: string;
  description: string;
  productCount: number;
  products: DaikinProduct[];
};

export type DaikinProductsCatalog = {
  source: string;
  generatedAt: string;
  note: string;
  categories: DaikinProductCategory[];
};

export const daikinProductsCatalog =
  daikinProductsJson as DaikinProductsCatalog;

export const daikinProductCategories = daikinProductsCatalog.categories;

export const getDaikinCategory = (categoryId: string | null | undefined) => {
  if (!categoryId) return daikinProductCategories[0] ?? null;
  return (
    daikinProductCategories.find((category) => category.id === categoryId) ??
    daikinProductCategories[0] ??
    null
  );
};
