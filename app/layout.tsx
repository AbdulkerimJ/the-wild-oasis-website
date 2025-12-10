import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import Logo from "./components/Logo";
import {Navigation} from "./components/Navigation";


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
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${josefinSans.className} antialiased bg-primary-950 text-primary-100 `}
      >
        <header>
          <Logo />
          <Navigation />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
