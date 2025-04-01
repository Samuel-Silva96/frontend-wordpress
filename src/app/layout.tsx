import { Inter } from "next/font/google";
import Header from "@components/Header.jsx";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className}`}>
        <div>
          <Header />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
