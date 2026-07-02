import type { Metadata } from "next";
import { JetBrains_Mono, Allura, DM_Mono, Roboto_Flex } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme-context";
import { AppShell } from "@/components/app-shell";
import { cn } from "@/lib/utils";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const boldonse = localFont({
  src: [{
    path: "../public/fonts/Boldonse/Boldonse-Regular.ttf",
    weight: "400",
  }],
  variable: "--font-serif",
  display: "swap",
});

const satoshi = localFont({
  src: [
    {
      path: "../public/fonts/Satoshi_Complete/Fonts/WEB/fonts/Satoshi-Variable.woff2",
      weight: "300 900",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi_Complete/Fonts/WEB/fonts/Satoshi-VariableItalic.woff2",
      weight: "300 900",
      style: "italic",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

const dmMono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap",
});

const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
  variable: "--font-roboto-flex",
  display: "swap",
});

const allura = Allura({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
});

const meddon = localFont({
  src: [{
    path: "../public/fonts/Meddon/Meddon-Regular.ttf",
    weight: "400",
  }],
  variable: "--font-meddon",
  display: "swap",
});

const peddana = localFont({
  src: [{
    path: "../public/fonts/Peddana-Regular.ttf",
    weight: "400",
  }],
  variable: "--font-peddana",
  display: "swap",
});

const questrial = localFont({
  src: [{
    path: "../public/fonts/Questrial/Questrial-Regular.ttf",
    weight: "400",
  }],
  variable: "--font-questrial",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chloe Wong - Portfolio",
  description: "Designer, researcher, and creative technologist",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(jetbrainsMono.variable, boldonse.variable, allura.variable, dmMono.variable, robotoFlex.variable, meddon.variable, peddana.variable, questrial.variable, satoshi.variable, "font-sans")}
      data-theme="terminal"
    >
      <body className={satoshi.className}>
        <ThemeProvider>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
