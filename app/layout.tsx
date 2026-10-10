import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "./providers/StoreProvider";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next SQL",
  description: "A clean starting point for your next project.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <Suspense fallback={<body className="min-h-full flex flex-col" />}>
        <StoreProvider>
          <body className="min-h-full flex flex-col">
            <ToastContainer />
            {children}
          </body>
        </StoreProvider>
      </Suspense>
    </html>
  );
}
