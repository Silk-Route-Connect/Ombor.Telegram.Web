"use client";

import Image from "next/image";
import { Package, Calendar, DollarSign, CheckCircle } from "lucide-react";
import noImg from "@/assets/no-image.png";
import { useRouter } from "next/navigation";

type OrderCardProps = {
  order: {
    id: number;
    orderDate: string;
    deliveredDate?: string;
    itemCount: number;
    total: number;
    status: "pending" | "processing" | "shipped" | "delivered" | "canceled";
  };
  history?: boolean;
};

export default function OrderCard({ order, history }: OrderCardProps) {
  const router = useRouter();

  const onCardClick = () => {
    router.push(`/order-history/${order.id}`);
  };

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    canceled: "bg-red-600 text-white",
  };

  const statusLabels = {
    pending: "Tekshirilmoqda",
    processing: "Jarayonda",
    shipped: "Jo'natildi",
    delivered: "Yetkazildi",
    canceled: "Bekor qilindi",
  };

  return (
    <div
      className="border rounded-lg shadow-sm bg-white cursor-pointer hover:shadow-md transition-all duration-300 p-4"
      onClick={onCardClick}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Package className="h-5 w-5 text-gray-600" />
          <span className="text-sm font-semibold text-gray-900">
            Buyurtma #{order.id}
          </span>
        </div>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full ${
            statusColors[order.status]
          }`}
        >
          {statusLabels[order.status]}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-xs text-gray-600">Zakaz qilingan:</span>
          </div>
          <span className="text-sm font-medium text-gray-900">
            {new Date(order.orderDate).toLocaleDateString()}
          </span>
        </div>

        {order.deliveredDate && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-xs text-gray-600">Yetkazilgan:</span>
            </div>
            <span className="text-sm font-medium text-gray-900">
              {new Date(order.deliveredDate).toLocaleDateString()}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-600">Mahsulotlar soni:</span>
          <span className="text-sm font-medium text-gray-900">
            {order.itemCount} dona
          </span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-green-600" />
            <span className="text-xs font-medium text-gray-600">
              Jami summa:
            </span>
          </div>
          <span className="text-base font-bold text-green-700">
            {order.total.toLocaleString()} so'm
          </span>
        </div>
      </div>
    </div>
  );
}
