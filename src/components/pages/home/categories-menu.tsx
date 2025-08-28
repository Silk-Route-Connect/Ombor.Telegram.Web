"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useGetList } from "@/hooks/query/useGetList";
import { CATEGORIES } from "@/config/endpoints";
import { GotCategoryTypes } from "@/types/categories";
import { Skeleton } from "@/components/ui/skeleton";
import NoData from "@/components/shared/no-data";

export default function CategoriesMenu() {
  const router = useRouter();
  const [current, setCurrent] = React.useState<string | null>(null);

  const { data, isPending } = useGetList<GotCategoryTypes[]>({
    endpoint: CATEGORIES.GET_CATEGORIES,
  });

  React.useEffect(() => {
    const handleScroll = () => {
      if (!data) return;

      const sections = data.map((item) =>
        document.getElementById(String(item.id))
      );
      let activeSection = null;

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            activeSection = String(data[i].id);
            break;
          }
        }
      }

      if (activeSection && activeSection !== current) {
        setCurrent(activeSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [data, current]);

  const handleClick = (id: string) => {
    setCurrent(id);
    const section = document.getElementById(id);
    if (section) {
      const offsetTop = section.offsetTop - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full my-5 sticky top-0 z-50 bg-white/80 backdrop-blur-[1px]">
      <ScrollArea className="w-full whitespace-nowrap py-2">
        <div className="flex gap-3 px-4">
          {isPending &&
            Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-32 rounded-full" />
            ))}

          {!isPending &&
            data &&
            data.length > 0 &&
            data.map((item) => (
              <Button
                key={item.id}
                variant={current === String(item.id) ? "default" : "outline"}
                className={cn(
                  "rounded-full w-fit px-4 py-2 transition-colors whitespace-nowrap",
                  current === String(item.id)
                    ? "bg-primary text-primary-foreground"
                    : "border-gray-300 hover:bg-primary/10"
                )}
                onClick={() => handleClick(String(item.id))}
              >
                {item.name}
              </Button>
            ))}

          {!isPending && (!data || data.length === 0) && <NoData />}
        </div>
        <ScrollBar orientation="horizontal" className="hidden" />
      </ScrollArea>
    </div>
  );
}
