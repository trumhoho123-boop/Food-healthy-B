// Product type definition
export type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  images: string[];
  description: string;
  weight: string;
  type: string;
  brand: string;
  packageQuantity: number;
  manufacturer: string;
  netQuantity: string;
  dimensions: string;
};

// Props type for pages that need navigation
export type NavigationProps = {
  setCurrentPage: (page: string) => void;
};

// Props type for Shop page
export type ShopProps = {
  setCurrentPage: (page: string) => void;
  navigateToProduct: (product: Product) => void;
};

// Props type for Shop-single page
export type ShopsingleProps = {
  product?: Product;
  setCurrentPage: (page: string) => void;
};