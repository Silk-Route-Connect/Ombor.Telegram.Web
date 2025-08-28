"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ProductCard from "@/components/reuseable/product-card";
import { useGetList } from "@/hooks/query/useGetList";
import { CATEGORIES, PRODUCTS } from "@/config/endpoints";
import { GotProductTypes } from "@/types/products";
import { GotCategoryTypes } from "@/types/categories";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function ShowMenuProducts() {
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const [visibleCount, setVisibleCount] = useState<Record<string, number>>({});

  const { data: categoriesData, isLoading: loadingCategories } = useGetList<
    GotCategoryTypes[]
  >({
    endpoint: CATEGORIES.GET_CATEGORIES,
  });

  const { data: productsData, isLoading: loadingProducts } = useGetList<
    GotProductTypes[]
  >({
    endpoint: PRODUCTS.GET_PRODUCTS,
  });

  const handleShowMore = (categoryId: string, total: number) => {
    setVisibleCount((prev) => ({
      ...prev,
      [categoryId]: total,
    }));
  };

  if (loadingCategories || loadingProducts) {
    return (
      <div className="space-y-12 w-full">
        {Array.from({ length: 3 }).map((_, sectionIdx) => (
          <section key={sectionIdx}>
            <Skeleton className="h-8 w-48 mb-6" />
            <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, idx) => (
                <Skeleton key={idx} className="h-64 w-full rounded-lg" />
              ))}
            </div>
          </section>
        ))}
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        <motion.div className="w-full">
          {categoriesData?.map((category) => {
            const categoryProducts =
              productsData?.filter(
                (p) => String(p.categoryId) === String(category.id)
              ) || [];

            if (categoryProducts.length === 0) return null;

            const count = visibleCount[String(category.id)] || 8;
            const visibleProducts = categoryProducts.slice(0, count);

            return (
              <section
                key={category.id}
                id={String(category.id)}
                ref={(el) => {
                  sectionRefs.current[String(category.id)] = el;
                }}
                className="mb-12 scroll-mt-24"
              >
                <h2 className="text-2xl font-bold mb-6 capitalize">
                  {category.name}
                </h2>
                <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {visibleProducts.map((product) => (
                    <motion.div key={product.id} layout>
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>

                {count < categoryProducts.length && (
                  <div className="flex justify-center mt-6">
                    <Button
                      variant="link"
                      onClick={() =>
                        handleShowMore(
                          String(category.id),
                          categoryProducts.length
                        )
                      }
                    >
                      Barchasini ko'rish
                    </Button>
                  </div>
                )}
              </section>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
