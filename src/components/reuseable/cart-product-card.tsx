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
  onDelete?: () => void;
};

export default function CartProductCard({
  product,
  onDelete,
}: CartProductCardProps) {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(1);
  const [inputValue, setInputValue] = useState("1");

  const total = Number(product.salePrice) * count;

  const onCardClick = () => {
    setOpen(true);
  };

  return (
    <>
      <div
        className="flex items-start gap-3 border rounded-md shadow-sm bg-white cursor-pointer hover:shadow-md transition"
        onClick={onCardClick}
      >
        <div className="w-24 h-28 flex-shrink-0 rounded overflow-hidden bg-gray-100">
          <img
            src={product.images[0]?.thumbnailUrl ?? noImg.src}
            alt={product.name}
            onError={(e) => (e.currentTarget.src = noImg.src)}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 space-y-1 p-2">
          <h2 className="text-sm font-semibold line-clamp-2 text-gray-900">
            {product.name}
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-green-600">
              {product.salePrice.toLocaleString()} so'm
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key="counter"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-between gap-1 mt-1 border border-primary/40 rounded-md px-1 py-0.5 bg-white w-full max-w-[120px]"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="outline"
                size="icon"
                className="h-6 w-6 rounded border-primary/40 text-primary hover:bg-primary hover:text-white"
                onClick={() => {
                  const newCount = Math.max(count - 1, 1);
                  setCount(newCount);
                  setInputValue(newCount.toString());
                }}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => {
                  const val = parseInt(e.target.value || "1");
                  const validated = Math.max(val, 1);
                  setInputValue(validated.toString());
                  setCount(validated);
                }}
                className="w-8 text-center text-xs font-semibold border-none bg-transparent focus:outline-none"
              />
              <Button
                variant="outline"
                size="icon"
                className="h-6 w-6 rounded border-primary/40 text-primary hover:bg-primary hover:text-white"
                onClick={() => {
                  const newCount = count + 1;
                  setCount(newCount);
                  setInputValue(newCount.toString());
                }}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="max-h-[98vh] bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex flex-col rounded-t-2xl">
          <div className="mx-auto w-full max-w-md h-full flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto overscroll-contain">
              <DrawerHeader className="pt-4 px-4">
                <div className="relative overflow-hidden rounded-xl mb-4 shadow-sm w-full h-52 bg-gray-100">
                  <img
                    src={product.images[0]?.thumbnailUrl || noImg.src}
                    alt={product.name}
                    onError={(e) => (e.currentTarget.src = noImg.src)}
                    className="w-full h-full object-cover"
                  />
                </div>
                <DrawerTitle className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white leading-snug mb-1">
                  {product.name}
                </DrawerTitle>
                <DrawerDescription className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {product.description}
                </DrawerDescription>
                <div className="flex items-center justify-between mt-4 p-3 bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-xl border border-primary/30 shadow-sm">
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    Narxi:
                  </span>
                  <span className="text-base font-bold text-primary">
                    {product.salePrice.toLocaleString()} so'm
                  </span>
                </div>
              </DrawerHeader>
            </div>

            <DrawerFooter className="px-4 py-4 space-y-3 border-t border-gray-100 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md">
              <div className="space-y-3">
                <div className="flex w-full items-center justify-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 rounded-full border border-primary/40 text-primary hover:bg-primary hover:text-white"
                    onClick={() => {
                      const newCount = Math.max(count - 1, 1);
                      setCount(newCount);
                      setInputValue(newCount.toString());
                    }}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => {
                      const val = parseInt(e.target.value || "1");
                      const validated = Math.max(val, 1);
                      setInputValue(validated.toString());
                      setCount(validated);
                    }}
                    className="w-32 py-1 outline-none text-center text-base font-bold border-none bg-transparent text-gray-900 dark:text-white"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 rounded-full border border-primary/40 text-primary hover:bg-primary hover:text-white"
                    onClick={() => {
                      const newCount = count + 1;
                      setCount(newCount);
                      setInputValue(newCount.toString());
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 p-3 rounded-xl border border-primary/30 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Jami:
                    </span>
                    <span className="text-base font-bold text-primary">
                      {total.toLocaleString()} so'm
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    size="sm"
                    className="w-full h-10 text-sm font-semibold bg-primary hover:bg-primary/90 text-white shadow-sm rounded-lg"
                    onClick={() => setOpen(false)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Savatda ({count} dona)
                  </Button>
                  {onDelete && (
                    <Button
                      size="sm"
                      variant="destructive"
                      className="h-10 w-10 p-0"
                      onClick={() => {
                        setOpen(false);
                        onDelete();
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
