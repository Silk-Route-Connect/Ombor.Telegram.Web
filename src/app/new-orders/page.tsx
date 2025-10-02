"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import OrderCard from "@/components/reuseable/order-card";
import NoData from "@/components/shared/no-data";
import { GotProductTypes } from "@/types/products";

type OrderCardProps = {
  order: {
    id: number;
    orderDate: string;
    deliveredDate?: string;
    itemCount: number;
    total: number;
    status: "pending" | "processing" | "shipped" | "delivered" | "canceled";
  };
};

const dummyOrders: OrderCardProps["order"][] = [
  {
    id: 1001,
    orderDate: "2025-09-10T14:30:00Z",
    itemCount: 2,
    total: 200000,
    status: "pending",
  },
  {
    id: 1002,
    orderDate: "2025-09-12T09:15:00Z",
    itemCount: 1,
    total: 42000,
    status: "processing",
  },
  {
    id: 1003,
    orderDate: "2025-09-14T16:45:00Z",
    itemCount: 3,
    total: 897000,
    status: "shipped",
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
