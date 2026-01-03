
export type Cabin = {
  id: number;
  created_at: string;      // or Date if you parse it
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
};
export type FilterType = "all" | "small" | "medium" | "large";
export function parseFilter(value: string | string[] | undefined): FilterType {
  const val = Array.isArray(value) ? value[0] : value; // pick first if array
  if (val === "small" || val === "medium" || val === "large") return val;
  return "all"; // fallback
}