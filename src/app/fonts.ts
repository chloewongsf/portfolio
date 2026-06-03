import localFont from "next/font/local";

export const BootzyTM = localFont({
  src: [
    {
      path: "../../public/fonts/bootzy/BootzyTM.woff",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-bootzy",
  display: "swap",
});