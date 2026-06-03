import type { Metadata } from "next";
import { JetBrains_Mono, Inter, Allura, DM_Mono, Roboto_Flex } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme-context";
import { AppShell } from "@/components/app-shell";

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

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
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
      className={`${jetbrainsMono.variable} ${boldonse.variable} ${inter.variable} ${allura.variable} ${dmMono.variable} ${robotoFlex.variable} ${meddon.variable} ${peddana.variable} ${questrial.variable}`}
      data-theme="terminal"
    >
      <body>
        <ThemeProvider>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
