export interface IProductsReq {
  search?: string;
  page: number;
  limit: number;
  sort?: string;
  categoryNames?: string[];
  priceFrom?: number;
  priceTo?: number;
  ratingFrom?: number;
  ratingTo?: number;
}

export interface IProductReq {
  id: string;
}

export interface IProduct {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  picture: string;
  rating: number;
}

export interface IMeta {
  count: number;
  total: number;
  sort?: {
    field: string;
    direction: string;
    availableFields: string[];
  };
}

export interface IGetProductsRes {
  meta: IMeta;
  data: IProduct[];
}

export interface IOrderInfo {
  product: IProduct;
  quantity: number;
  createdAt: string;
}

export interface IGetOrders {
  meta: IMeta;
  data: IOrderInfo[][];
}

export interface IGetCart {
  product: IProduct;
  quantity: number;
  createdAt: string;
}

export interface IUpdateCart {
  data: {
    id: string;
    quantity: number;
  }[];
}

export interface IGetOrdersParams {
  page: number;
  limit: number;
}
