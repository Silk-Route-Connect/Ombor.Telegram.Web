"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import ProductCard from "@/components/reuseable/product-card";

import demoProductImg from "@/assets/palov.webp";

const products = [
  {
    id: "1",
    image: demoProductImg,
    title: "Coca Cola 1L",
    description: "Yengil gazlangan ichimlik, sovuq holda iching.",
    amount: 12000,
    category: "ichimliklar",
  },
  {
    id: "2",
    image: demoProductImg,
    title: "Fanta 1L",
    description: "Apelsin taʼmli ichimlik, shirin va mazali.",
    amount: 11000,
    category: "ichimliklar",
  },
  {
    id: "3",
    image: demoProductImg,
    title: "Pepsi 1L",
    description: "Shirin gazlangan ichimlik.",
    amount: 11500,
    category: "ichimliklar",
  },
  {
    id: "4",
    image: demoProductImg,
    title: "Sprite 1L",
    description: "Limon taʼmli ichimlik, yoqimli va tetiklantiruvchi.",
    amount: 11000,
    category: "ichimliklar",
  },
  {
    id: "5",
    image: demoProductImg,
    title: "Pizza Margarita",
    description: "Pishloq va pomidorli klassik pizza.",
    amount: 45000,
    category: "taomlar",
  },
  {
    id: "6",
    image: demoProductImg,
    title: "Cheeseburger",
    description: "Mol go‘shti va pishloqli burger.",
    amount: 30000,
    category: "taomlar",
  },
  {
    id: "7",
    image: demoProductImg,
    title: "Hotdog",
    description: "Sosiska va sabzavotli hotdog.",
    amount: 18000,
    category: "taomlar",
  },
  {
    id: "8",
    image: demoProductImg,
    title: "Lavash",
    description: "Mol go‘shti va sabzavotli lavash.",
    amount: 25000,
    category: "taomlar",
  },
  {
    id: "9",
    image: demoProductImg,
    title: "Shokoladli tort",
    description: "Yumshoq va shirin shokoladli tort.",
    amount: 25000,
    category: "shirinliklar",
  },
  {
    id: "10",
    image: demoProductImg,
    title: "Medovik",
    description: "Asalli tort, mazali va yumshoq.",
    amount: 27000,
    category: "shirinliklar",
  },
  {
    id: "11",
    image: demoProductImg,
    title: "Napoleon",
    description: "Qatlamli shirinlik.",
    amount: 30000,
    category: "shirinliklar",
  },
  {
    id: "12",
    image: demoProductImg,
    title: "Pahlava",
    description: "Sharqona shirinlik.",
    amount: 20000,
    category: "shirinliklar",
  },
  {
    id: "13",
    image: demoProductImg,
    title: "Olma",
    description: "Yangi uzilgan qizil olma.",
    amount: 8000,
    category: "mevalar",
  },
  {
    id: "14",
    image: demoProductImg,
    title: "Anor",
    description: "Sog‘lomlik manbai, yangi anor.",
    amount: 15000,
    category: "mevalar",
  },
  {
    id: "15",
    image: demoProductImg,
    title: "Banan",
    description: "Shirin va yumshoq banan.",
    amount: 12000,
    category: "mevalar",
  },
  {
    id: "16",
    image: demoProductImg,
    title: "Uzum",
    description: "Tabiiy va yangi uzum.",
    amount: 10000,
    category: "mevalar",
  },
  {
    id: "17",
    image: demoProductImg,
    title: "Pomidor",
    description: "Tabiiy va yangi pomidor.",
    amount: 7000,
    category: "sabzavotlar",
  },
  {
    id: "18",
    image: demoProductImg,
    title: "Bodring",
    description: "Yangi uzilgan bodring.",
    amount: 6000,
    category: "sabzavotlar",
  },
  {
    id: "19",
    image: demoProductImg,
    title: "Sabzi",
    description: "Sog‘lomlik uchun foydali sabzi.",
    amount: 5000,
    category: "sabzavotlar",
  },
  {
    id: "20",
    image: demoProductImg,
    title: "Kartoshka",
    description: "Sifatli kartoshka.",
    amount: 4000,
    category: "sabzavotlar",
  },
  {
    id: "21",
    image: demoProductImg,
    title: "Guruch 1kg",
    description: "Sifatli oq guruch.",
    amount: 20000,
    category: "donmaxsulotlari",
  },
  {
    id: "22",
    image: demoProductImg,
    title: "Un 1kg",
    description: "Sifatli bug‘doy uni.",
    amount: 10000,
    category: "donmaxsulotlari",
  },
  {
    id: "23",
    image: demoProductImg,
    title: "Makaroni",
    description: "Turli shakldagi makaronlar.",
    amount: 15000,
    category: "donmaxsulotlari",
  },
  {
    id: "24",
    image: demoProductImg,
    title: "Noxat",
    description: "Oq no‘xat, taomlar uchun.",
    amount: 12000,
    category: "donmaxsulotlari",
  },
];

const categories = [
  { id: "ichimliklar", name: "Ichimliklar" },
  { id: "taomlar", name: "Taomlar" },
  { id: "shirinliklar", name: "Shirinliklar" },
  { id: "mevalar", name: "Mevalar" },
  { id: "sabzavotlar", name: "Sabzavotlar" },
  { id: "donmaxsulotlari", name: "Don mahsulotlari" },
];

export default function ShowMenuProducts() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const current = searchParams.get("menu") || categories[0].id;
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const id = entry.target.getAttribute("id");
            if (id) {
              const url = new URL(window.location.href);
              url.searchParams.set("menu", id);
              window.history.replaceState({}, "", url.toString());
            }
          }
        });
      },
      { threshold: [0.5] }
    );

    Object.values(sectionRefs.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const element = document.getElementById(current);
    if (element) {
      const yOffset = -120;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [current]);

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        <motion.div key={current} className="w-full">
          {categories.map((category) => {
            const categoryProducts = products.filter(
              (p) => p.category === category.id
            );

            return (
              <section
                key={category.id}
                id={category.id}
                ref={(el) => {
                  sectionRefs.current[category.id] = el;
                }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold mb-6 capitalize">
                  {category.name}
                </h2>
                <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {categoryProducts.map((product) => (
                    <motion.div key={product.id}>
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
