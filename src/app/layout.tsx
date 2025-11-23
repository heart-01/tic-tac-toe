import "./globals.css";
import type { Metadata } from "next";
import MainLayout from "./components/organisms/Main/Main";

export const metadata: Metadata = {
  title: "Tic Tac Toe",
  description: "Tic Tac Toe game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <MainLayout>{children} </MainLayout>
      </body>
    </html>
  );
}
