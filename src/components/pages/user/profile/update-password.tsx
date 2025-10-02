"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const formSchema = z
  .object({
    oldPassword: z
      .string()
      .min(6, { message: "Parol kamida 6 ta belgidan iborat bo‘lishi kerak." })
      .max(50, { message: "Parol 50 ta belgidan oshmasligi kerak." }),
    newPassword: z
      .string()
      .min(6, { message: "Parol kamida 6 ta belgidan iborat bo‘lishi kerak." })
      .max(50, { message: "Parol 50 ta belgidan oshmasligi kerak." }),
    confirmPassword: z
      .string()
      .min(6, { message: "Parol kamida 6 ta belgidan iborat bo‘lishi kerak." })
      .max(50, { message: "Parol 50 ta belgidan oshmasligi kerak." }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Parollar mos kelmadi.",
    path: ["confirmPassword"],
  });

export default function ChangePassword() {
  const [isOpen, setIsOpen] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // parolni o‘zgartirish logikasi shu yerda bo‘ladi
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-primary text-white hover:bg-primary/90"
        >
          Parolni o‘zgartirish
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] rounded-2xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl font-bold text-primary">
            Parolni o‘zgartirish
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Yodingizda qoladigan va xavfsiz kuchli parol tanlang.
          </DialogDescription>
        </DialogHeader>
        <div className="my-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Eski parol
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showOldPassword ? "text" : "password"}
                          placeholder="Joriy parolingizni kiriting"
                          {...field}
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary"
                          onClick={() => setShowOldPassword(!showOldPassword)}
                        >
                          {showOldPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-destructive mt-1" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Yangi parol
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showNewPassword ? "text" : "password"}
                          placeholder="Yangi parolni kiriting"
                          {...field}
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-destructive mt-1" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Parolni tasdiqlash
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Yangi parolni qayta kiriting"
                          {...field}
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-destructive mt-1" />
                  </FormItem>
                )}
              />

              <DialogFooter className="flex items-center justify-between gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="border border-gray-300 hover:border-primary hover:text-primary"
                  onClick={() => {
                    form.reset();
                    setIsOpen(false);
                  }}
                >
                  Bekor qilish
                </Button>
                <Button
                  type="submit"
                  className="bg-primary text-white hover:bg-primary/90"
                >
                  Saqlash
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
