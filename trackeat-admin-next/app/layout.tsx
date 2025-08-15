import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TrackEat Admin",
  description: "Painel administrativo do TrackEat",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
