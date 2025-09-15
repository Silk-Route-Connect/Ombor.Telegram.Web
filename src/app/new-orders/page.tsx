"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import OrderCard from "@/components/reuseable/order-card";
import NoData from "@/components/shared/no-data";
import { GotProductTypes } from "@/types/products";

const dummyOrders: {
  id: number;
  product: GotProductTypes & { quantity: number };
  orderDate: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "canceled";
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
    status: "pending",
    total: 200000,
  },
  {
    id: 1002,
    product: {
      id: 84,
      barcode: "1234567890123",
      categoryId: 2,
      categoryName: "книги",
      description:
        "A captivating mystery novel that keeps you on the edge of your seat.",
      images: [
        {
          id: 2,
          name: "product-2.jpg",
          originalUrl: "images/products/originals/sample-product-2.jpg",
          thumbnailUrl: "images/products/thumbnails/sample-product-2-thumb.jpg",
        },
      ],
      isLowStock: false,
      lowStockThreshold: 10,
      measurement: "Piece",
      name: "Тайна Старого Дома",
      quantityInStock: 250,
      retailPrice: 45000,
      salePrice: 42000,
      sku: "TSD-2-789",
      supplyPrice: 20000,
      type: "All",
      quantity: 1,
    },
    orderDate: "2025-09-12T09:15:00Z",
    status: "processing",
    total: 42000,
  },
  {
    id: 1003,
    product: {
      id: 85,
      barcode: "9876543210987",
      categoryId: 5,
      categoryName: "электроника",
      description:
        "Compact wireless earbuds with noise cancellation and high-fidelity sound.",
      images: [
        {
          id: 3,
          name: "product-3.jpg",
          originalUrl: "images/products/originals/sample-product-3.jpg",
          thumbnailUrl: "images/products/thumbnails/sample-product-3-thumb.jpg",
        },
      ],
      isLowStock: true,
      lowStockThreshold: 5,
      measurement: "Piece",
      name: "Беспроводные Наушники Pro",
      quantityInStock: 12,
      retailPrice: 320000,
      salePrice: 299000,
      sku: "BNP-5-001",
      supplyPrice: 150000,
      type: "All",
      quantity: 3,
    },
    orderDate: "2025-09-14T16:45:00Z",
    status: "shipped",
    total: 897000,
  },
];

export default function OrdersTabPage() {
  const newOrders = dummyOrders.filter((o) => o.status === "pending");
  const processingOrders = dummyOrders.filter(
    (o) => o.status === "processing" || o.status === "shipped"
  );

  return (
    <div className="max-w-[1200px] mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-4">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center sm:text-left">
        Sizning Buyurtmalaringiz
      </h1>

      <Tabs defaultValue="new" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="new">Yangi</TabsTrigger>
          <TabsTrigger value="processing">Jarayondagi</TabsTrigger>
        </TabsList>

        <TabsContent value="new" className="mt-4">
          {newOrders.length === 0 ? (
            <NoData />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {newOrders.map((order) => (
                <OrderCard key={order.id} order={order} history={false} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="processing" className="mt-4">
          {processingOrders.length === 0 ? (
            <NoData />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {processingOrders.map((order) => (
                <OrderCard key={order.id} order={order} history={true} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
