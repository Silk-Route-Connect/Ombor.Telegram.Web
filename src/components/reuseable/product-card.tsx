"use client";

import * as React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

type Product = {
  id: string;
  image: any;
  title: string;
  description: string;
  amount: number;
};

export default function ProductCard({ product }: { product: Product }) {
  const [open, setOpen] = React.useState(false);
  const [count, setCount] = React.useState(0);
  const [inputValue, setInputValue] = React.useState("0");

  const total = product.amount * count;

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (count === 0) {
      setCount(1);
      setInputValue("1");
    } else {
      setOpen(true);
    }
  };

  React.useEffect(() => {
    setInputValue(count.toString());
  }, [count]);

  return (
    <>
      <Card
        onClick={() => setOpen(true)}
        className="group cursor-pointer p-0 hover:shadow-md hover:scale-[1.01] transition-all duration-300 border border-gray-200/60 hover:border-primary/40 bg-white dark:bg-gray-900 overflow-hidden rounded-xl flex flex-col"
      >
        <CardHeader className="p-0 relative flex-shrink-0">
          <div className="relative overflow-hidden rounded-t-xl">
            <Image
              src={product.image}
              alt={product.title}
              width={300}
              height={200}
              className="w-full h-32 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </CardHeader>

        <CardContent className="p-2 flex-1 flex flex-col">
          <CardTitle className="text-xs font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary transition-colors leading-snug mb-1 flex-1">
            {product.title}
          </CardTitle>

          <div className="flex items-center justify-between mt-auto">
            <p className="text-sm font-bold text-primary">
              {product.amount.toLocaleString()} so'm
            </p>
          </div>

          {count === 0 ? (
            <motion.div
              key="add-btn"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="outline"
                size="sm"
                className="w-full h-7 mt-2 text-[11px] border-primary/30 hover:border-primary hover:bg-primary hover:text-white rounded-lg transition-all duration-300"
                onClick={handleAddClick}
              >
                <Plus className="h-3 w-3 mr-1" />
                Qo'shish
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="counter"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="w-full flex items-center justify-between gap-1 mt-2 border border-primary/40 rounded-lg p-1 bg-white dark:bg-gray-800"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="outline"
                size="icon"
                className="h-6 w-6 rounded-md border-primary/40 text-primary hover:bg-primary hover:text-white"
                onClick={() => setCount((prev) => Math.max(prev - 1, 0))}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => {
                  const val = parseInt(e.target.value || "0");
                  setInputValue(e.target.value);
                  setCount(Math.max(val, 0));
                }}
                className="w-8 text-center text-[11px] font-semibold border-none bg-transparent focus:outline-none"
              />
              <Button
                variant="outline"
                size="icon"
                className="h-6 w-6 rounded-md border-primary/40 text-primary hover:bg-primary hover:text-white"
                onClick={() => setCount((prev) => prev + 1)}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </motion.div>
          )}
        </CardContent>
      </Card>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="max-h-[92vh] bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex flex-col rounded-t-2xl">
          <div className="mx-auto w-full max-w-md h-full flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto overscroll-contain px-3">
              <DrawerHeader className="pt-4">
                <div className="relative overflow-hidden rounded-xl mb-3 shadow-sm">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={600}
                    height={300}
                    className="w-full h-44 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
                <DrawerTitle className="text-lg font-bold text-gray-900 dark:text-white leading-snug">
                  {product.title}
                </DrawerTitle>
                <DrawerDescription className="text-xs text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
                  {product.description}
                </DrawerDescription>
                <div className="flex items-center justify-between mt-4 p-3 bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-xl border border-primary/30 shadow-sm">
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    Narxi:
                  </span>
                  <span className="text-lg font-bold text-primary">
                    {product.amount.toLocaleString()} so'm
                  </span>
                </div>
              </DrawerHeader>
            </div>

            <DrawerFooter className="px-3 py-4 space-y-3 border-t border-gray-100 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md">
              {count === 0 ? (
                <Button
                  size="sm"
                  className="w-full h-10 text-sm font-semibold bg-primary hover:bg-primary/90 text-white shadow-sm rounded-lg"
                  onClick={() => setCount(1)}
                >
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Savatga qo'shish
                </Button>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 rounded-full border border-primary/40 text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                      onClick={() => setCount((prev) => Math.max(prev - 1, 0))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <input
                      type="number"
                      value={inputValue}
                      onChange={(e) => {
                        const val = parseInt(e.target.value || "0");
                        setInputValue(e.target.value);
                        setCount(Math.max(val, 0));
                      }}
                      className="w-12 text-center text-lg font-bold border-none bg-transparent focus:outline-none text-gray-900 dark:text-white"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 rounded-full border border-primary/40 text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                      onClick={() => setCount((prev) => prev + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 p-3 rounded-xl border border-primary/30 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Jami:
                      </span>
                      <span className="text-lg font-bold text-primary">
                        {total.toLocaleString()} so'm
                      </span>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    className="w-full h-10 text-sm font-semibold bg-primary hover:bg-primary/90 text-white shadow-sm rounded-lg"
                    onClick={() => setOpen(false)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Savatda ({count} dona)
                  </Button>
                </div>
              )}
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
