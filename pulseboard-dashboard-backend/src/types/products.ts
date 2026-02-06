type ProductsSnapshot = {
  type: "products";
  period: string;
  current_period: {
    total_products: number;
    active_products: number;
    inactive_products: number;
    products_with_revenue: number;
  };
  previous_period: {
    total_products: number;
    active_products: number;
    inactive_products: number;
    products_with_revenue: number;
  };
};
