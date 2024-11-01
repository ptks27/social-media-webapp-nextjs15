import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import ReactQueryProvider from "./ReactQueryProvider";
import {NextSSRPlugin} from "@uploadthing/react/next-ssr-plugin"
import { extractRouterConfig } from "uploadthing/server";
import { fileRouter } from "./api/uploadthing/core";

const kanitThinItalic = localFont({
  src: "./fonts/Kanit-ThinItalic.woff",
  variable: "--font-kanit-thin-italic",
});
const kanitRegular = localFont({
  src: "./fonts/Kanit-Regular.woff",
  variable: "--font-kanit-regular",
});
export const metadata: Metadata = {
  title: {
    template: "%s | beba",
    default: "Social Media | beba 𖹭",
  },
  description: "The social media website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${kanitThinItalic.variable} ${kanitRegular.variable}`}>
        <NextSSRPlugin routerConfig={extractRouterConfig(fileRouter)}/>
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
