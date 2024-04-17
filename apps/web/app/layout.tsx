import "@ui/styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
    <body className="antialiased">
    <div className="" />
    {children}
    </body>
    </html>
  );
}