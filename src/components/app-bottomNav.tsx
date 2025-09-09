"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, ShoppingCart, Package } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/products-filter", label: "Products", icon: Package },
  { href: "/cart", label: "Cart", icon: ShoppingCart },
];

export default function AppBottomNav() {
  const pathname = usePathname();
  const [hide, setHide] = useState(false);

  console.log("hide:", hide);

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "tween", duration: 0.3 }}
      className={`fixed border ${
        hide
          ? "bottom-0 left-0 right-0 rounded-t-[25px]"
          : "left-2 right-2 bottom-2 rounded-full"
      } z-50 mx-auto max-w-md backdrop-blur-[2px] shadow-lg sm:left-1/2 sm:right-auto sm:-translate-x-1/2`}
    >
      <div className="flex items-center justify-around py-1.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                size="icon"
                className="rounded-full"
              >
                <Icon className="h-5 w-5" />
              </Button>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
