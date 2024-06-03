import "@ui/styles/globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@ui/components/toaster";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.className} h-full`}>
      <body className="flex h-full flex-col scroll-smooth antialiased">
        <Toaster />

        <div className="" />
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
