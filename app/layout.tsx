import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tradeparency — understand it before you buy it",
  description:
    "An educational prototype that helps self-directed investors understand complex products before they act. Not investment advice, not a real trading platform.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
