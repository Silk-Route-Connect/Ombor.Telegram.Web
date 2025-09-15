"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { PRODUCTS } from "@/config/endpoints";
import { useGetList } from "@/hooks/query/useGetList";
import { GotProductTypes } from "@/types/products";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import ProductCard from "@/components/reuseable/product-card";
import NoData from "@/components/shared/no-data";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useMemo, useCallback } from "react";

export default function ShowFilteredProducts() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

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

  const activeFilters = useMemo(() => {
    const filters: { key: string; label: string }[] = [];
    if (categoryId) {
      filters.push({ key: "categoryId", label: `Kategoriya: ${categoryId}` });
    }
    if (minPrice) {
      filters.push({
        key: "minPrice",
        label: `Min: ${parseInt(minPrice).toLocaleString()} so'm`,
      });
    }
    if (maxPrice) {
      filters.push({
        key: "maxPrice",
        label: `Max: ${parseInt(maxPrice).toLocaleString()} so'm`,
      });
    }
    return filters;
  }, [categoryId, minPrice, maxPrice]);

  const removeFilter = useCallback((key: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.delete(key);
    
    const search = current.toString();
    const query = search ? `?${search}` : "";
    
    router.push(`${pathname}${query}`);
  }, [searchParams, router, pathname]);

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
    return (
      <div>
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {activeFilters.map((filter) => (
              <Badge
                key={filter.key}
                variant="secondary"
                className="flex items-center gap-1 px-2 py-1"
              >
                {filter.label}
                <button
                  type="button"
                  onClick={() => removeFilter(filter.key)}
                  className="ml-1 hover:opacity-70"
                >
                  <X size={14} />
                </button>
              </Badge>
            ))}
          </div>
        )}
        <NoData />
      </div>
    );
  }

  return (
    <div className="w-full">
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {activeFilters.map((filter) => (
            <Badge
              key={filter.key}
              variant="secondary"
              className="flex items-center gap-1 px-2 py-1"
            >
              {filter.label}
              <button
                type="button"
                onClick={() => removeFilter(filter.key)}
                className="ml-1 hover:opacity-70"
              >
                <X size={14} />
              </button>
            </Badge>
          ))}
        </div>
      )}

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