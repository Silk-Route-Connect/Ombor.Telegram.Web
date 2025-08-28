import HomeCarousel from "@/components/pages/home/carousel";
import CategoriesMenu from "@/components/pages/home/categories-menu";
import ShowMenuProducts from "@/components/pages/home/show-menu-products";

export default function Home() {
  return (
    <>
      <HomeCarousel />
      <CategoriesMenu />
      <ShowMenuProducts />
    </>
  );
}
