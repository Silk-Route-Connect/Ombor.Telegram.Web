import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import AppHeader from "@/components/app-header";
import AppFooter from "@/components/app-footer";
import AppBottomNav from "@/components/app-bottomNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen overflow-hidden flex`}
      >
        <Providers>
          <AppSidebar />
          <main className="flex-1 bg-white h-full overflow-hidden flex flex-col">
            <AppHeader />
            <div className="flex-1 overflow-auto px-3">
              <div className="min-h-full flex flex-col justify-between">
                <div className="pb-8">{children}</div>
                <AppFooter />
              </div>
            </div>
            <AppBottomNav/>
          </main>
        </Providers>
      </body>
    </html>
  );
}
