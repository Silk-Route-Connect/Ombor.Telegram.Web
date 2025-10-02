"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const formSchema = z.object({
  fullName: z
    .string()
    .min(5, { message: "Ismingizni to'liq kiriting" })
    .max(50, { message: "Kiritilgan ism juda uzun!!!" }),
  phoneNumber: z.string().regex(/^\d{2}-\d{3}-\d{4}$/, {
    message: "Telefon raqamni to'liq kiriting",
  }),
  description: z.string(),
  location: z.object({
    lat: z.number(),
    lng: z.number(),
    name: z.string().min(1, { message: "Lokatsiya nomini kiriting" }),
  }),
});

interface Location {
  lat: number;
  lng: number;
  name: string;
}

function LocationPicker({
  onLocationSelect,
}: {
  onLocationSelect: (location: Location) => void;
}) {
  const [position, setPosition] = useState<Location | null>(null);

  useMapEvents({
    click: async (e: any) => {
      const { lat, lng } = e.latlng;
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );
        const data = await response.json();
        const locationName =
          data.display_name ||
          (data.address
            ? Object.values(data.address).join(", ")
            : "Noma'lum joy");
        const newLocation = { lat, lng, name: locationName };
        setPosition(newLocation);
        onLocationSelect(newLocation);
      } catch (error) {
        console.error("Error fetching location name:", error);
        const newLocation = { lat, lng, name: "Noma'lum joy" };
        setPosition(newLocation);
        onLocationSelect(newLocation);
      }
    },
  });

  return position ? (
    <Marker position={[position.lat, position.lng]}>
      <Popup>{position.name}</Popup>
    </Marker>
  ) : null;
}

export default function ConfirmOrderPage() {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      location: { lat: 41.2995, lng: 69.2401, name: "" },
      description: "",
    },
  });

  useEffect(() => {
    form.setValue("fullName", "Muxsinjon Maxsudovich");
    form.setValue("phoneNumber", "93-098-1409");
    form.setValue("location", {
      lat: 41.2995,
      lng: 69.2401,
      name: "Toshkent, O'zbekiston",
    });
  }, []);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setShowSuccess(true);

    setTimeout(() => {
      router.push("/new-orders");
    }, 3000);
  }

  const handleLocationSelect = (location: Location) => {
    form.setValue("location", location);
  };

  return (
    <div className="relative my-5 min-h-screen">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>To'liq ismingiz</FormLabel>
                <FormControl>
                  <Input placeholder="To'liq ismingizni kiriting" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefon raqam</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      +998-
                    </span>
                    <Input
                      className="pl-16"
                      placeholder="99-345-6789"
                      {...field}
                      maxLength={12}
                      onChange={(e) => {
                        let val = e.target.value.replace(/\D/g, "").slice(0, 9);
                        if (val.length > 2 && val.length <= 5) {
                          val = val.slice(0, 2) + "-" + val.slice(2);
                        } else if (val.length > 5) {
                          val =
                            val.slice(0, 2) +
                            "-" +
                            val.slice(2, 5) +
                            "-" +
                            val.slice(5, 9);
                        }
                        field.onChange(val);
                      }}
                      value={field.value}
                    />
                  </div>
                </FormControl>
                <FormMessage>
                  {field.value &&
                    field.value.replace(/\D/g, "").length !== 9 &&
                    "Telefon raqamni to'liq kiriting"}
                </FormMessage>
              </FormItem>
            )}
          />

          {!showSuccess && (
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Joylashuvni tanlang</FormLabel>
                  <FormControl>
                    <div className="h-64 mt-2">
                      <MapContainer
                        center={[41.2995, 69.2401]}
                        zoom={13}
                        style={{ height: "100%", width: "100%" }}
                        attributionControl={false}
                      >
                        <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />

                        <LocationPicker
                          onLocationSelect={handleLocationSelect}
                        />
                      </MapContainer>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Izoh</FormLabel>
                <FormControl>
                  <textarea
                    className="w-full border rounded-md p-2 min-h-[80px] resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Tasdiqlash</Button>
        </form>
      </Form>

      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50">
          <div className="flex flex-col items-center space-y-4 animate-fadeIn">
            <CheckCircle className="text-green-500 text-6xl animate-pulse" />
            <span className="text-xl font-bold">Buyurtma tasdiqlandi!</span>
          </div>
        </div>
      )}
    </div>
  );
}
