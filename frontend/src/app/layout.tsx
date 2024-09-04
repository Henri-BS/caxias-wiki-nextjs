import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"] , weight: "300"});

export const metadata: Metadata = {
  title: "Destino Caxias",
  description: "Projeto destinado a exibir e descrever detalhes sobre a cultura, fauna, flora e locais em Caxias/MA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>{children}</body>
    </html>
  );
}
