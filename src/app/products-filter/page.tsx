import React, { Suspense } from "react";
import FiltersDrawer from "@/components/pages/products-filter/filters-drawer";
import ShowFilteredProducts from "@/components/pages/products-filter/show-filtered-products";

export default function ProductsFilterPage() {
  return (
    <>
      <Suspense fallback={<div>Filterlar yuklanmoqda...</div>}>
        <div className="my-5 w-full sticky top-1 z-50">
          <FiltersDrawer />
        </div>
      </Suspense>
      <Suspense fallback={<div>Mahsulotlar yuklanmoqda...</div>}>
        <ShowFilteredProducts />
      </Suspense>
    </>
  );
}
