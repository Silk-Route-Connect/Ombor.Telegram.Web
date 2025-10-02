"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Wallet,
  PlusCircle,
  ArrowUpCircle,
  ArrowDownCircle,
} from "lucide-react";

export default function UserBalance() {
  return (
    <div className="py-5">
      <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-8 tracking-tight">
        Mening balansim
      </h1>

      <Card className="shadow-lg rounded-2xl border border-gray-200 bg-white">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10">
              <Wallet className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-lg sm:text-xl font-semibold text-gray-900">
              Joriy balans
            </CardTitle>
          </div>
          <span className="text-3xl md:text-4xl font-extrabold text-primary">
            1,250,000 so'm
          </span>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 py-8">
          <Button className="bg-primary text-white hover:bg-primary/90 flex items-center gap-2 rounded-xl px-6 py-3 shadow-md">
            <PlusCircle className="w-5 h-5" /> Balansni to'ldirish
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2 rounded-xl border-gray-300 hover:border-primary hover:text-primary px-6 py-3 shadow-sm"
          >
            <ArrowUpCircle className="w-5 h-5" /> Pul o'tkazish
          </Button>
        </CardContent>
      </Card>

      <div className="mt-10">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
          Oxirgi tranzaksiyalar
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-5 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-red-100">
                <ArrowDownCircle className="w-5 h-5 text-red-500" />
              </div>
              <span className="text-gray-800 font-medium">
                Pul yechib olish
              </span>
            </div>
            <span className="font-bold text-red-600">-250,000 so'm</span>
          </div>
          <div className="flex items-center justify-between p-5 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-green-100">
                <ArrowUpCircle className="w-5 h-5 text-green-500" />
              </div>
              <span className="text-gray-800 font-medium">
                Balans to'ldirish
              </span>
            </div>
            <span className="font-bold text-green-600">+1,000,000 so'm</span>
          </div>
        </div>
      </div>
    </div>
  );
}
