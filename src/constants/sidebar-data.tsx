import {
  ChartBarStacked,
  CircleDollarSign,
  History,
  Settings,
  TableProperties,
} from "lucide-react";

export const SidebarData = [
  {
    title: "Buyurtmalar tarixi",
    url: "/order-history",
    icon: History,
  },
   {
    title: "Balance",
    url: "/user/balance",
    icon: CircleDollarSign,
  },
  // {
  //   title: "Demo tables",
  //   url: "/demo-tables",
  //   icon: TableProperties,
  // },
  // {
  //   title: "Settings",
  //   url: "#",
  //   icon: Settings,
  //   subItems: [
  //     {
  //       title: "Profile",
  //       url: "/user/profile",
  //     },
  //     {
  //       title: "Notifications",
  //       url: "/user/notifications",
  //     },
  //   ],
  // },
];
