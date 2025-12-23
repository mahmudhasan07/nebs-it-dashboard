import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import logo from "@/assests/Word.png"
import ReduxProvider from "@/Redux/ReduxProvider";
// import ReduxProvider from "@/components/Redux/ReduxProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Perfect Dashboard",
  description: "The control panel for Find Jobs",
  icons: {
    icon: logo.src
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}
      >
        <ReduxProvider>
          {
            children
          }
        </ReduxProvider>
      </body>
    </html>
  );
}
