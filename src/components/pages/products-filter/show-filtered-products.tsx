"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { PRODUCTS } from "@/config/endpoints";
import { useGetList } from "@/hooks/query/useGetList";
import { GotProductTypes } from "@/types/products";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import ProductCard from "@/components/reuseable/product-card";
import NoData from "@/components/shared/no-data";

export default function ShowFilteredProducts() {
  const searchParams = useSearchParams();

  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const categoryId = searchParams.get("categoryId");

  const { data: filteredProductsData, isLoading: filteredProductsLoading } =
    useGetList<GotProductTypes[]>({
      endpoint: PRODUCTS.GET_PRODUCTS,
      params: {
        ...(minPrice ? { MinPrice: parseInt(minPrice) } : {}),
        ...(maxPrice ? { MaxPrice: parseInt(maxPrice) } : {}),
        ...(categoryId ? { CategoryId: parseInt(categoryId) } : {}),
      },
    });

  if (filteredProductsLoading) {
    return (
      <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, idx) => (
          <Skeleton key={idx} className="h-64 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (!filteredProductsData || filteredProductsData.length === 0) {
    return <NoData />;
  }

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        <motion.div
          className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          layout
        >
          {filteredProductsData.map((product) => (
            <motion.div key={product.id} layout>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
