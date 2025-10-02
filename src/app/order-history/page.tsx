"use client";

import OrderCard from "@/components/reuseable/order-card";

const dummyOrders: {
  id: number;
  orderDate: string;
  deliveredDate?: string;
  itemCount: number;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "canceled";
}[] = [
  {
    id: 1001,
    orderDate: "2025-09-10T14:30:00Z",
    deliveredDate: "2025-09-15T10:20:00Z",
    itemCount: 3,
    total: 450000,
    status: "delivered",
  },
  {
    id: 1002,
    orderDate: "2025-09-12T09:15:00Z",
    itemCount: 1,
    total: 100000,
    status: "processing",
  },
  {
    id: 1003,
    orderDate: "2025-09-08T16:45:00Z",
    deliveredDate: "2025-09-10T14:30:00Z",
    itemCount: 5,
    total: 780000,
    status: "delivered",
  },
  {
    id: 1004,
    orderDate: "2025-09-05T11:00:00Z",
    itemCount: 2,
    total: 200000,
    status: "canceled",
  },
];

export default function OrderHistory() {
  return (
    <div className="py-4 space-y-4 max-w-3xl mx-auto px-4">
      <h1 className="text-2xl font-bold text-gray-800">Buyurtmalar Tarixi</h1>
      {dummyOrders.length === 0 ? (
        <p className="text-center text-gray-500">Buyurtmalar mavjud emas</p>
      ) : (
        <div className="space-y-3">
          {dummyOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
