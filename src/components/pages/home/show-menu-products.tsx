"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import ProductCard from "@/components/reuseable/product-card";
import { useGetList } from "@/hooks/query/useGetList";
import { CATEGORIES, PRODUCTS } from "@/config/endpoints";
import { GotProductTypes } from "@/types/products";
import { GotCategoryTypes } from "@/types/categories";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default function ShowMenuProducts() {
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

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

  if (loadingCategories || loadingProducts) {
    return (
      <div className="space-y-12 w-full">
        {Array.from({ length: 3 }).map((_, sectionIdx) => (
          <section key={sectionIdx}>
            <Skeleton className="h-8 w-full mb-6" />
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

            return (
              <section
                key={category.id}
                id={String(category.id)}
                ref={(el) => {
                  sectionRefs.current[String(category.id)] = el;
                }}
                className="mb-12 scroll-mt-24"
              >
                <div className="flex flex-wrap items-end justify-between mb-6">
                  <h2 className="text-2xl font-bold capitalize">
                    {category.name}
                  </h2>
                  <Link href={"/products-filter"}>
                    <Button variant="link" className="text-primary w-fit p-0">
                      Barchasini ko'rish
                    </Button>
                  </Link>
                </div>
                <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {categoryProducts.map((product) => (
                    <motion.div key={product.id} layout>
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>
              </section>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
