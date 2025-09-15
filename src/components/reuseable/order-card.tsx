"use client";

import Image from "next/image";
import { useState } from "react";
import { GotProductTypes } from "@/types/products";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Package, Calendar, DollarSign } from "lucide-react";
import noImg from "@/assets/no-image.png";

type OrderCardProps = {
  order: {
    id: number;
    product: GotProductTypes & { quantity: number };
    orderDate: string;
    total: number;
    status?: "pending" | "processing" | "shipped" | "delivered" | "canceled";
  };
  history?: boolean;
};

export default function OrderCard({ order, history = false }: OrderCardProps) {
  const [open, setOpen] = useState(false);

  const onCardClick = () => {
    setOpen(true);
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
    <>
      <div
        className="flex items-start gap-3 border rounded-lg shadow-sm bg-white cursor-pointer hover:shadow-md transition-all duration-300 p-3"
        onClick={onCardClick}
      >
        <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
          <img
            src={order.product.images[0]?.thumbnailUrl ?? noImg.src}
            alt={order.product.name}
            onError={(e) => (e.currentTarget.src = noImg.src)}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 space-y-1.5">
          <h2 className="text-xs sm:text-sm font-semibold line-clamp-2 text-gray-900">
            {order.product.name}
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-bold text-green-700">
              {order.total.toLocaleString()} so'm
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-gray-500" />
            <span className="text-[10px] sm:text-xs text-gray-600">
              {new Date(order.orderDate).toLocaleDateString()}
            </span>
          </div>
          {order.status && (
            <div className="flex items-center gap-1.5">
              <span
                className={`text-[10px] sm:text-xs font-semibold px-1.5 py-0.5 rounded-full ${
                  statusColors[order.status]
                }`}
              >
                {statusLabels[order.status]}
              </span>
            </div>
          )}
        </div>
      </div>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="max-h-[90vh] bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 rounded-t-xl">
          <div className="mx-auto w-full max-w-md flex flex-col h-full overflow-hidden">
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <DrawerHeader>
                <div className="relative overflow-hidden rounded-xl mb-3 shadow-sm w-full h-40 sm:h-48 bg-gray-100">
                  <img
                    src={order.product.images[0]?.thumbnailUrl || noImg.src}
                    alt={order.product.name}
                    onError={(e) => (e.currentTarget.src = noImg.src)}
                    className="w-full h-full object-cover"
                  />
                </div>
                <DrawerTitle className="text-sm sm:text-base font-bold text-gray-900 dark:text-white mb-1">
                  {order.product.name}
                </DrawerTitle>
                <DrawerDescription className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-300 mb-3">
                  {order.product.description}
                </DrawerDescription>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <span className="text-[10px] sm:text-xs font-medium text-gray-700 dark:text-gray-300">
                      Buyurtma raqami:
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-primary">
                      #{order.id}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <span className="text-[10px] sm:text-xs font-medium text-gray-700 dark:text-gray-300">
                      Narxi:
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-primary">
                      {order.product.salePrice.toLocaleString()} so'm
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <span className="text-[10px] sm:text-xs font-medium text-gray-700 dark:text-gray-300">
                      Miqdori:
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-primary">
                      {order.product.quantity} dona
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <span className="text-[10px] sm:text-xs font-medium text-gray-700 dark:text-gray-300">
                      Jami:
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-primary">
                      {order.total.toLocaleString()} so'm
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <span className="text-[10px] sm:text-xs font-medium text-gray-700 dark:text-gray-300">
                      Sana:
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-primary">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </span>
                  </div>
                  {order.status && (
                    <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <span className="text-[10px] sm:text-xs font-medium text-gray-700 dark:text-gray-300">
                        Holat:
                      </span>
                      <span
                        className={`text-[10px] sm:text-xs font-semibold px-1.5 py-0.5 rounded-full ${
                          statusColors[order.status]
                        }`}
                      >
                        {statusLabels[order.status]}
                      </span>
                    </div>
                  )}
                </div>
              </DrawerHeader>
            </div>

            <DrawerFooter className="px-4 py-3 border-t border-gray-100 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95">
              <Button
                size="sm"
                className="w-full h-9 text-xs sm:text-sm font-semibold bg-primary hover:bg-primary/90 text-white rounded-md"
                onClick={() => setOpen(false)}
              >
                <Package className="h-3.5 w-3.5 mr-1" />
                Buyurtma tafsilotlari
              </Button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}