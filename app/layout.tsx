import type { Metadata } from "next";
import { camp } from "../content/camp";
import "./globals.css";

export const metadata: Metadata = {
  title: camp.pageTitle,
  description: camp.description,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sq">
      <body>{children}</body>
    </html>
  );
}
