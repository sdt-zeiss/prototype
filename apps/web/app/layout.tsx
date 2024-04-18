import "@ui/styles/globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@ui/components/toaster";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="antialiased">
        <Toaster />

        <div className="" />
        {children}
      </body>
    </html>
  );
}
