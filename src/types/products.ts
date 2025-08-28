export interface GotProductTypes {
  barcode: string;
  categoryId: number | string;
  categoryName: string;
  description: string;
  id: number | string;
  images: [
    {
      id: number | string;
      name: string;
      originalUrl: string;
      thumbnailUrl: string;
    }
  ];
  isLowStock: boolean;
  lowStockThreshold: number | string;
  measurement: string;
  name: string;
  quantityInStock: number | string;
  retailPrice: number | string;
  salePrice: number | string;
  sku: string;
  supplyPrice: number | string;
  type: string;

  // not data, its from front
  activeCategory?: string | number;
}
