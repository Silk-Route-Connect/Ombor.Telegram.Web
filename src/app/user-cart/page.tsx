"use client";

import CartProductCard from "@/components/reuseable/cart-product-card";
import { GotProductTypes } from "@/types/products";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const dummyCartItems: (GotProductTypes & { quantity: number })[] = [
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
  {
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
];

export default function UserCart() {
  const [cartItems, setCartItems] = useState(dummyCartItems);
  const router = useRouter();

  const updateQuantity = (id: number, newQuantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(newQuantity, 1) } : item
      )
    );
  };

  const deleteItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce(
    (sum, item: any) => sum + item.salePrice * item.quantity,
    0
  );

  const handleOrder = () => {
    router.push("/user-cart/confirm");
  };

  return (
    <div className="p-4 space-y-6 max-w-3xl mx-auto bg-gray-50 rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800">Sizning Savatingiz</h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Savat bo'sh</p>
      ) : (
        cartItems.map((item: any) => (
          <CartProductCard
            key={item.id}
            product={item}
            quantity={item.quantity}
            onQuantityChange={(newQty) => updateQuantity(item.id, newQty)}
            onDelete={() => deleteItem(item.id)}
          />
        ))
      )}
      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between text-lg font-semibold text-gray-800">
          <span>Jami:</span>
          <span>{total.toLocaleString()} so'm</span>
        </div>
      </div>
      <Button
        className="w-full h-12 text-lg font-bold bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md"
        onClick={handleOrder}
        disabled={cartItems.length === 0}
      >
        Buyurtma berish
      </Button>
    </div>
  );
}
