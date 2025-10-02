"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  phone: z
    .string()
    .min(9, {
      message: "Yaroqli telefon raqamini kiriting.",
    })
    .max(50, { message: "Telefon raqami 50 ta belgidan oshmasligi kerak." }),
  fullName: z
    .string()
    .min(5, {
      message: "To‘liq ism kamida 5 ta belgidan iborat bo‘lishi kerak.",
    })
    .max(50, { message: "To‘liq ism 50 ta belgidan oshmasligi kerak." }),
  email: z.string({ message: "Yaroqli email manzilini kiriting." }),
});

export default function ProfileUpdate() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "930981409",
      fullName: "Muxsinjon Maxsudovich",
      email: "muxsincoder@gamil.com",
    },
  });

  const router = useRouter();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Profil yangilash logikasi shu yerda yoziladi
  };

  return (
    <Card className="shadow-md rounded-2xl border border-gray-100">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
          <span className="text-primary">Foydalanuvchi</span> profili
          ma’lumotlari
        </CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="flex flex-wrap gap-6">
            <div className="w-full md:w-[30%]">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      To‘liq ism
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="To‘liq ismingizni kiriting"
                        {...field}
                        className="rounded-lg focus:border-primary focus:ring-primary"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-destructive mt-1" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full md:w-[30%]">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Email manzilingizni kiriting"
                        {...field}
                        className="rounded-lg focus:border-primary focus:ring-primary"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-destructive mt-1" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full md:w-[30%]">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Telefon raqam
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                          +998
                        </span>
                        <Input
                          type="text"
                          placeholder="11 222 3344"
                          {...field}
                          value={field.value
                            ?.replace(/\D/g, "")
                            .slice(0, 9)
                            .replace(/(\d{2})(\d{3})(\d{4})/, "$1 $2 $3")}
                          onChange={(e) => {
                            const raw = e.target.value
                              .replace(/\D/g, "")
                              .slice(0, 9);
                            field.onChange(raw);
                          }}
                          className="pl-16 rounded-lg focus:border-primary focus:ring-primary"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-destructive mt-1" />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row items-center gap-4 mt-6">
            <Button
              type="submit"
              className="w-full sm:w-auto bg-primary text-white hover:bg-primary/90"
            >
              Saqlash
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              className="w-full sm:w-auto border-gray-300 hover:border-primary hover:text-primary"
            >
              Bekor qilish
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
