import { apiClient } from "@/api/client";

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  logo_url?: string | null;
}

export async function fetchProducts(): Promise<Product[]> {
  const { data } = await apiClient.get<Product[]>("/products");
  return data;
}
