  "use client";

  import * as React from "react";
  import { cn } from "@/lib/utils";
  import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
  import { Button } from "@/components/ui/button";
  import { useGetList } from "@/hooks/query/useGetList";
  import { CATEGORIES } from "@/config/endpoints";
  import { GotCategoryTypes } from "@/types/categories";
  import { Skeleton } from "@/components/ui/skeleton";
  import NoData from "@/components/shared/no-data";

  export default function CategoriesMenu() {
    const [current, setCurrent] = React.useState<string | null>(null);
    const scrollAreaRef = React.useRef<HTMLDivElement>(null);
    const buttonsRef = React.useRef<{ [key: string]: HTMLButtonElement }>({});

    const { data, isPending } = useGetList<GotCategoryTypes[]>({
      endpoint: CATEGORIES.GET_CATEGORIES,
    });

    const scrollToCenter = (id: string) => {
      const scrollArea = scrollAreaRef.current;
      const button = buttonsRef.current[id];

      if (scrollArea && button) {
        const scrollContainer = scrollArea.querySelector(
          "[data-radix-scroll-area-viewport]"
        );
        if (scrollContainer) {
          const containerRect = scrollContainer.getBoundingClientRect();
          const buttonRect = button.getBoundingClientRect();

          const scrollLeft =
            button.offsetLeft - containerRect.width / 2 + buttonRect.width / 2;

          scrollContainer.scrollTo({
            left: scrollLeft,
            behavior: "smooth",
          });
        }
      }
    };

    React.useEffect(() => {
      if (!data) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setCurrent(entry.target.id);
              scrollToCenter(entry.target.id);
            }
          });
        },
        { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
      );

      data.forEach((item) => {
        const section = document.getElementById(String(item.id));
        if (section) observer.observe(section);
      });

      return () => observer.disconnect();
    }, [data]);

    const handleClick = (id: string) => {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
        setCurrent(id);
        scrollToCenter(id);
      }
    };

    return (
      <div className="w-full my-5 sticky -top-5 z-50 bg-white/80 backdrop-blur-[1px]">
        <ScrollArea ref={scrollAreaRef} className="w-full whitespace-nowrap py-2">
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
                  ref={(el) => {
                    if (el) buttonsRef.current[String(item.id)] = el;
                  }}
                  onClick={() => handleClick(String(item.id))}
                  variant={current === String(item.id) ? "default" : "outline"}
                  className={cn(
                    "rounded-full w-fit px-4 py-2 transition-colors whitespace-nowrap",
                    current === String(item.id)
                      ? "bg-primary text-primary-foreground"
                      : "border-gray-300 hover:bg-primary/10"
                  )}
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
