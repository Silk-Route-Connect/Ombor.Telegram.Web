"use client";

import OrderCard from "@/components/reuseable/order-card";
import { GotProductTypes } from "@/types/products";

const dummyOrders: {
  id: number;
  product: GotProductTypes & { quantity: number };
  orderDate: string;
  status: "pending" | "processing" | "shipped" | "delivered" |"canceled";
  total: number;
}[] = [
  {
    id: 1001,
    product: {
      id: 83,
      barcode: "7310449965499",
      categoryId: 4,
      categoryName: "игры",
      description:
        "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
      images: [
        {
          id: 1,
          name: "product-1.jpg",
          originalUrl:
            "images/products/originals/4834bb13b1e243d28edc1cd4732d367d.jpg",
          thumbnailUrl:
            "images/products/thumbnails/4834bb13b1e243d28edc1cd4732d367d.jpg",
        },
      ],
      isLowStock: false,
      lowStockThreshold: 16,
      measurement: "Gram",
      name: "Большой Бетонный Автомобиль",
      quantityInStock: 9142,
      retailPrice: 97000,
      salePrice: 100000,
      sku: "ББА-4-5156",
      supplyPrice: 36000,
      type: "All",
      quantity: 2,
    },
    orderDate: "2025-09-10T14:30:00Z",
    status: "delivered",
    total: 200000,
  },
   {
    id: 1001,
    product: {
      id: 83,
      barcode: "7310449965499",
      categoryId: 4,
      categoryName: "игры",
      description:
        "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
      images: [
        {
          id: 1,
          name: "product-1.jpg",
          originalUrl:
            "images/products/originals/4834bb13b1e243d28edc1cd4732d367d.jpg",
          thumbnailUrl:
            "images/products/thumbnails/4834bb13b1e243d28edc1cd4732d367d.jpg",
        },
      ],
      isLowStock: false,
      lowStockThreshold: 16,
      measurement: "Gram",
      name: "Большой Бетонный Автомобиль",
      quantityInStock: 9142,
      retailPrice: 97000,
      salePrice: 100000,
      sku: "ББА-4-5156",
      supplyPrice: 36000,
      type: "All",
      quantity: 2,
    },
    orderDate: "2025-09-10T14:30:00Z",
    status: "delivered",
    total: 200000,
  },
   {
    id: 1001,
    product: {
      id: 83,
      barcode: "7310449965499",
      categoryId: 4,
      categoryName: "игры",
      description:
        "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
      images: [
        {
          id: 1,
          name: "product-1.jpg",
          originalUrl:
            "images/products/originals/4834bb13b1e243d28edc1cd4732d367d.jpg",
          thumbnailUrl:
            "images/products/thumbnails/4834bb13b1e243d28edc1cd4732d367d.jpg",
        },
      ],
      isLowStock: false,
      lowStockThreshold: 16,
      measurement: "Gram",
      name: "Большой Бетонный Автомобиль",
      quantityInStock: 9142,
      retailPrice: 97000,
      salePrice: 100000,
      sku: "ББА-4-5156",
      supplyPrice: 36000,
      type: "All",
      quantity: 2,
    },
    orderDate: "2025-09-10T14:30:00Z",
    status: "canceled",
    total: 200000,
  },
];

export default function OrderHistory() {
  return (
    <div className="py-4 space-y-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800">Buyurtmalar Tarixi</h1>
      {dummyOrders.length === 0 ? (
        <p className="text-center text-gray-500">Buyurtmalar mavjud emas</p>
      ) : (
        dummyOrders.map((order) => (
          <OrderCard key={order.id} order={order} history={true} />
        ))
      )}
    </div>
  );
}
