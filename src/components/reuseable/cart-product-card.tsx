"use client";

import Image from "next/image";
import { useState } from "react";
import { GotProductTypes } from "@/types/products";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import noImg from "@/assets/no-image.png";

type CartProductCardProps = {
  product: GotProductTypes;
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  onDelete: () => void;
};

export default function CartProductCard({
  product,
  quantity,
  onQuantityChange,
  onDelete,
}: CartProductCardProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(quantity.toString());

  const total = Number(product.salePrice) * quantity;

  const onCardClick = () => {
    setOpen(true);
  };

  const handleQuantityChange = (newQty: number) => {
    const validated = Math.max(newQty, 1);
    setInputValue(validated.toString());
    onQuantityChange(validated);
  };

  return (
    <>
      <div
        className="flex items-start gap-4 border rounded-lg shadow-md bg-white cursor-pointer hover:shadow-xl transition-all duration-300 p-3"
        onClick={onCardClick}
      >
        <div className="w-24 h-28 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 shadow-sm">
          <img
            src={product.images[0]?.thumbnailUrl ?? noImg.src}
            alt={product.name}
            onError={(e) => (e.currentTarget.src = noImg.src)}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 space-y-2">
          <h2 className="text-sm font-semibold line-clamp-2 text-gray-900">
            {product.name}
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-green-700">
              {product.salePrice.toLocaleString()} so'm
            </span>
            {product.retailPrice > product.salePrice && (
              <span className="text-xs line-through text-gray-500">
                {product.retailPrice.toLocaleString()} so'm
              </span>
            )}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key="counter"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-start gap-2 mt-2 border border-primary/50 rounded-full px-2 py-1 bg-white w-full max-w-[120px] shadow-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="outline"
                size="icon"
                className="h-6 w-6 rounded-full border-primary/50 text-primary hover:bg-primary hover:text-white"
                onClick={() => handleQuantityChange(quantity - 1)}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => {
                  const val = parseInt(e.target.value || "1");
                  handleQuantityChange(val);
                }}
                className="w-10 text-center text-xs font-bold border-none bg-transparent focus:outline-none"
              />
              <Button
                variant="outline"
                size="icon"
                className="h-6 w-6 rounded-full border-primary/50 text-primary hover:bg-primary hover:text-white"
                onClick={() => handleQuantityChange(quantity + 1)}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="max-h-[95vh] bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex flex-col rounded-t-2xl shadow-2xl">
          <div className="mx-auto w-full max-w-md h-full flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4">
              <DrawerHeader>
                <div className="relative overflow-hidden rounded-2xl mb-4 shadow-md w-full h-52 bg-gray-100">
                  <img
                    src={product.images[0]?.thumbnailUrl || noImg.src}
                    alt={product.name}
                    onError={(e) => (e.currentTarget.src = noImg.src)}
                    className="w-full h-full object-cover"
                  />
                </div>
                <DrawerTitle className="text-base font-bold text-gray-900 dark:text-white mb-1">
                  {product.name}
                </DrawerTitle>
                <DrawerDescription className="text-xs text-gray-600 dark:text-gray-300 mb-3">
                  {product.description}
                </DrawerDescription>
                <div className="flex items-center justify-between mt-3 p-3 bg-gradient-to-r from-primary/10 to-primary/20 dark:from-primary/20 dark:to-primary/30 rounded-xl border border-primary/40 shadow-md">
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Narxi:
                  </span>
                  <span className="text-sm font-bold text-primary">
                    {product.salePrice.toLocaleString()} so'm
                  </span>
                </div>
              </DrawerHeader>
            </div>

            <DrawerFooter className="px-4 py-3 space-y-3 border-t border-gray-100 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-top">
              <div className="flex w-full items-center justify-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full border border-primary/50 text-primary hover:bg-primary hover:text-white"
                  onClick={() => handleQuantityChange(quantity - 1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => {
                    const val = parseInt(e.target.value || "1");
                    handleQuantityChange(val);
                  }}
                  className="w-16 py-0.5 outline-none text-center text-sm font-bold border-none bg-transparent text-gray-900 dark:text-white"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full border border-primary/50 text-primary hover:bg-primary hover:text-white"
                  onClick={() => handleQuantityChange(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="bg-gradient-to-r from-primary/20 to-primary/10 dark:from-primary/30 dark:to-primary/20 p-3 rounded-xl border border-primary/40 shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Jami:
                  </span>
                  <span className="text-sm font-bold text-primary">
                    {total.toLocaleString()} so'm
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  size="sm"
                  className="w-full h-10 text-sm font-bold bg-primary hover:bg-primary/90 text-white shadow-md rounded-lg"
                  onClick={() => setOpen(false)}
                >
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Savatda ({quantity} dona)
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="h-10 w-10 p-0 rounded-lg shadow-md"
                  onClick={() => {
                    setOpen(false);
                    onDelete();
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
