import FiltersDrawer from "@/components/pages/products-filter/filters-drawer";
import ShowFilteredProducts from "@/components/pages/products-filter/show-filtered-products";

export default function ProductsFiterPage() {
  return (
    <>
      <div className="my-5 w-full sticky top-1 z-50">
        <FiltersDrawer />
      </div>
      <ShowFilteredProducts />
    </>
  );
}
