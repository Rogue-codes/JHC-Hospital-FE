export interface IProduct {
  name: string;
  price: number | string;
  description: string;
  expiry_date: any;
  quantity: number | string;
  category: string;
  manufacturer: string;
  image?: string;
}

export interface IProductResponse {
  status: string;
  message: string;
  data: IProduct[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}
