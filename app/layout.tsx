import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";

export const metadata: Metadata = {
  title: {
    default: "The Wild Oasis",
    template: "%s | The Wild Oasis",
  },
  description:
    "Discover the beauty of untouched nature and find your own wild oasis.",
};

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],

});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${josefinSans.className} antialiased bg-primary-950 text-primary-100  min-h-screen flex flex-col`}
      >
        <Header />
        <div className="flex-1">
          <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12 ">{children}</main>
        </div>
      </body>
    </html>
  );
}
