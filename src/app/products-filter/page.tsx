import React, { Suspense } from "react";
import FiltersDrawer from "@/components/pages/products-filter/filters-drawer";
import ShowFilteredProducts from "@/components/pages/products-filter/show-filtered-products";
import CirculeLoader from "@/components/reuseable/circule-loader/circule-loader";

export default function ProductsFilterPage() {
  return (
    <>
      <Suspense fallback={""}>
        <div className="my-5 w-full sticky top-1 z-50">
          <FiltersDrawer />
        </div>
      </Suspense>
      <Suspense fallback={""}>
        <ShowFilteredProducts />
      </Suspense>
    </>
  );
}
