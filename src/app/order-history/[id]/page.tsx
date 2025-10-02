"use client";

import { useParams } from "next/navigation";
import ProductCard from "@/components/reuseable/product-card";
import { GotProductTypes } from "@/types/products";
import {
  Package,
  Calendar,
  DollarSign,
  CheckCircle,
  MapPin,
  Phone,
  User,
} from "lucide-react";

const dummyOrderDetails: {
  [key: number]: {
    id: number;
    orderDate: string;
    deliveredDate?: string;
    total: number;
    status: "pending" | "processing" | "shipped" | "delivered" | "canceled";
    products: (GotProductTypes & { quantity: number })[];
    customerInfo: {
      name: string;
      phone: string;
      address: string;
    };
  };
} = {
  1001: {
    id: 1001,
    orderDate: "2025-09-10T14:30:00Z",
    deliveredDate: "2025-09-15T10:20:00Z",
    total: 450000,
    status: "delivered",
    products: [
      {
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
      {
        id: 84,
        barcode: "7310449965500",
        categoryId: 4,
        categoryName: "игры",
        description: "High quality gaming console with advanced features",
        images: [
          {
            id: 2,
            name: "product-2.jpg",
            originalUrl:
              "images/products/originals/5834bb13b1e243d28edc1cd4732d367e.jpg",
            thumbnailUrl:
              "images/products/thumbnails/5834bb13b1e243d28edc1cd4732d367e.jpg",
          },
        ],
        isLowStock: false,
        lowStockThreshold: 10,
        measurement: "Piece",
        name: "Gaming Console Pro",
        quantityInStock: 50,
        retailPrice: 150000,
        salePrice: 125000,
        sku: "GCP-4-5157",
        supplyPrice: 80000,
        type: "All",
        quantity: 1,
      },
      {
        id: 85,
        barcode: "7310449965501",
        categoryId: 4,
        categoryName: "игры",
        description: "Wireless gaming headset with noise cancellation",
        images: [
          {
            id: 3,
            name: "product-3.jpg",
            originalUrl:
              "images/products/originals/6834bb13b1e243d28edc1cd4732d367f.jpg",
            thumbnailUrl:
              "images/products/thumbnails/6834bb13b1e243d28edc1cd4732d367f.jpg",
          },
        ],
        isLowStock: false,
        lowStockThreshold: 20,
        measurement: "Piece",
        name: "Gaming Headset X1",
        quantityInStock: 120,
        retailPrice: 80000,
        salePrice: 75000,
        sku: "GHX-4-5158",
        supplyPrice: 45000,
        type: "All",
        quantity: 1,
      },
    ],
    customerInfo: {
      name: "Алишер Усмонов",
      phone: "+998 90 123 45 67",
      address: "Тошкент шаҳри, Мирзо Улуғбек тумани, Чиноз кўчаси, 25-уй",
    },
  },
  1002: {
    id: 1002,
    orderDate: "2025-09-12T09:15:00Z",
    total: 100000,
    status: "processing",
    products: [
      {
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
        quantity: 1,
      },
    ],
    customerInfo: {
      name: "Фарҳод Каримов",
      phone: "+998 91 234 56 78",
      address: "Самарқанд шаҳри, Регистон кўчаси, 12-уй",
    },
  },
};

export default function SingleOrderHistory() {
  const params = useParams();
  const orderId = Number(params.id);
  const order = dummyOrderDetails[orderId];

  if (!order) {
    return (
      <div className="py-8 px-4 max-w-3xl mx-auto">
        <p className="text-center text-gray-500">Buyurtma topilmadi</p>
      </div>
    );
  }

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
    <div className="py-4 px-4 max-w-3xl mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-5">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-800">
            Buyurtma #{order.id}
          </h1>
          <span
            className={`text-sm font-semibold px-3 py-1.5 rounded-full ${
              statusColors[order.status]
            }`}
          >
            {statusLabels[order.status]}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">Zakaz qilingan</p>
            <p className="text-sm font-medium text-gray-900">
              {new Date(order.orderDate).toLocaleDateString()}
            </p>
          </div>

          {order.deliveredDate && (
            <div>
              <p className="text-xs text-gray-500 mb-1">Yetkazilgan</p>
              <p className="text-sm font-medium text-gray-900">
                {new Date(order.deliveredDate).toLocaleDateString()}
              </p>
            </div>
          )}

          <div>
            <p className="text-xs text-gray-500 mb-1">Mahsulotlar soni</p>
            <p className="text-sm font-medium text-gray-900">
              {order.products.reduce((sum, p) => sum + p.quantity, 0)} dona
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Jami summa</p>
            <p className="text-base font-bold text-green-700">
              {order.total.toLocaleString()} so'm
            </p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-900">
                {order.customerInfo.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-900">
                {order.customerInfo.phone}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
              <span className="text-sm text-gray-900">
                {order.customerInfo.address}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-800">Mahsulotlar</h2>
        {order.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
