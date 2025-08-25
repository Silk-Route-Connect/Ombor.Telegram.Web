"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const categories = [
  { id: "ichimliklar", name: "Ichimliklar" },
  { id: "taomlar", name: "Taomlar" },
  { id: "shirinliklar", name: "Shirinliklar" },
  { id: "mevalar", name: "Mevalar" },
  { id: "sabzavotlar", name: "Sabzavotlar" },
  { id: "donmaxsulotlari", name: "Don mahsulotlari" },
];

export default function MenuSlider() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeSection, setActiveSection] = React.useState(categories[0].id);
  const current = searchParams.get("menu") || activeSection;

  React.useEffect(() => {
    const handleScroll = () => {
      let currentSection = categories[0].id;

      for (const category of categories) {
        const element = document.getElementById(category.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom > 150) {
            currentSection = category.id;
            break;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -120;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setActiveSection(id);

    const url = new URL(window.location.href);
    url.searchParams.set("menu", id);
    router.push(url.toString());
  };

  return (
    <div className="w-full my-5 sticky -top-5 z-50 bg-white/80 backdrop-blur-[1px]">
      <ScrollArea className="w-full whitespace-nowrap py-2">
        <div className="flex gap-3 px-4">
          {categories.map((item) => (
            <Button
              key={item.id}
              onClick={() => handleClick(item.id)}
              variant={current === item.id ? "default" : "secondary"}
              className={cn(
                "rounded-full w-fit px-4 py-2 transition-colors",
                current === item.id
                  ? "border border-primary"
                  : "border-transparent hover:bg-primary/10"
              )}
            >
              {item.name}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="hidden" />
      </ScrollArea>
    </div>
  );
}
