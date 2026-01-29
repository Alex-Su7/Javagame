
import React from "react";
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JavaQuest - Learn Java the Fun Way",
  description: "Gamified Java learning with AI tutoring",
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body className="bg-slate-900 text-slate-100 h-screen overflow-hidden antialiased">
        <div id="root" className="h-full">
          {children}
        </div>
      </body>
    </html>
  );
}
