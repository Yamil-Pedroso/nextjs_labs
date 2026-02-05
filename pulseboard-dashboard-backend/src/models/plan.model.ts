export interface Plan {
  id: string;
  name: string;
  subtitle?: string;
  options?: string[];
  price: number;
  interval: string;
}
