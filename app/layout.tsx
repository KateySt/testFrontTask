import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import { Provider } from "@/components/ui/provider";
import { Toaster } from "@/components/ui/toaster";
import ThemeProvider from "@/providers/ThemeProvider";
import { StorageProvider } from "@/providers/StorageProvider";

export const metadata: Metadata = {
  title: "City weather",
  description: "Weather in any city",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <ThemeProvider>
            <StorageProvider>{children}</StorageProvider>
          </ThemeProvider>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
