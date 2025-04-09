export interface Book {
  id: string;
  name: string;
  short_description?: string;
  description?: string;
  book_cover: string | null;

  authors: {
    id: number;
    name: string;
    slug: string;
  }[];

  categories: {
    id: number;
    name: string;
    is_leaf: boolean;
  };

  current_seller: {
    id: number;
    sku: string;
    name: string;
    link: string;
    logo: string;
    price: number;
    product_id: string;
    store_id: number;
    is_best_store: boolean;
    is_offline_installment_supported: boolean | null;
  };

  original_price: number;
  list_price: number;

  quantity_sold?: {
    text: string;
    value: number;
  };

  rating_average?: number;

  images: {
    base_url: string;
    is_gallery: boolean;
    label: string | null;
    large_url: string;
    medium_url: string;
    position: number | null;
    small_url: string;
    thumbnail_url: string;
  }[];

  specifications: {
    name: string;
    attributes: {
      code: string;
      name: string;
      value: string;
    }[];
  }[];
}
