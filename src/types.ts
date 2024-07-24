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
  id: number;
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

export interface IMetaData {
  count: number;
  total: number;
  sort: string;
}

export interface IProductsRes {
  meta: IMetaData;
  data: IProduct[];
}
