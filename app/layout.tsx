import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "./actions/AuthContext";
import { Layout } from "./components/Layout";
import { openSans, montserrat } from "./fonts";
import { ConnectionFlowWrapper } from "./components/connection/wrapper";
import Script from "next/script";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Brandlogs",
  description: "Birthday Hero Challenge",
  icons: {
    icon: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.jpg" />
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-EF4FEVJCKC"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-EF4FEVJCKC');
            `,
          }}
        />
      </head>
      <body className={`${geistMono.variable}`}>
        <QueryProvider>
          <AuthProvider>
            <Layout>
              <ConnectionFlowWrapper>{children}</ConnectionFlowWrapper>
            </Layout>
          </AuthProvider>
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
