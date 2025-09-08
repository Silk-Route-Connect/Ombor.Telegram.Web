"use client";

import React, { useState, Suspense } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Slider } from "@/components/ui/slider";
import { useRouter, useSearchParams } from "next/navigation";
import { CATEGORIES } from "@/config/endpoints";
import { useGetList } from "@/hooks/query/useGetList";
import { GotCategoryTypes } from "@/types/categories";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

function FiltersDrawerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { data: categoriesData } = useGetList<GotCategoryTypes[]>({
    endpoint: CATEGORIES.GET_CATEGORIES,
  });

  const initialMin = searchParams.get("minPrice");
  const initialMax = searchParams.get("maxPrice");
  const initialCategoryId = searchParams.get("categoryId");

  const MAX_VALUE = 1000000;

  const [priceRange, setPriceRange] = useState<number[]>([
    initialMin ? parseInt(initialMin) : 0,
    initialMax ? parseInt(initialMax) : MAX_VALUE,
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    initialCategoryId || undefined
  );

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
  };

  const applyFilters = () => {
    const params = new URLSearchParams(window.location.search);

    if (priceRange[0] > 0) {
      params.set("minPrice", priceRange[0].toString());
    } else {
      params.delete("minPrice");
    }

    if (priceRange[1] < MAX_VALUE) {
      params.set("maxPrice", priceRange[1].toString());
    } else {
      params.delete("maxPrice");
    }

    if (selectedCategory) {
      params.set("categoryId", selectedCategory);
    } else {
      params.delete("categoryId");
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <>
      <DrawerContent className="px-4 pb-6 pt-2">
        <DrawerHeader>
          <DrawerTitle>Narx bo‘yicha filter</DrawerTitle>
        </DrawerHeader>

        <div className="mt-4">
          <Slider
            min={0}
            max={MAX_VALUE}
            step={1000}
            value={priceRange}
            onValueChange={handlePriceChange}
            minStepsBetweenThumbs={1}
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>{priceRange[0].toLocaleString()} so'm</span>
            <span>
              {priceRange[1] === MAX_VALUE
                ? `${priceRange[1].toLocaleString()}+ so'm`
                : `${priceRange[1].toLocaleString()} so'm`}
            </span>
          </div>
        </div>

        <div className="mt-8">
          <DrawerTitle className="mb-2">Kategoriya</DrawerTitle>
          <RadioGroup
            value={selectedCategory}
            onValueChange={setSelectedCategory}
            className="grid gap-3"
          >
            {categoriesData?.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={String(category.id)}
                  id={`category-${category.id}`}
                />
                <Label htmlFor={`category-${category.id}`}>
                  {category.name}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="mt-6">
          <Button
            onClick={() => {
              applyFilters();
            }}
            className="w-full"
          >
            Qo‘llash
          </Button>
        </div>
      </DrawerContent>
    </>
  );
}

export default function FiltersDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Filterlar</Button>
      </DrawerTrigger>
      <Suspense fallback={<div>Loading...</div>}>
        <FiltersDrawerContent />
      </Suspense>
    </Drawer>
  );
}
