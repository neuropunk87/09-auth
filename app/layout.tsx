import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const roboto = Roboto({
  display: "swap",
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "NoteHub - Share Notes Instantly Online",
  description: `Write, publish, and share notes instantly with Notehub. A simple and fast way to make your notes public with just one click. By @neuropunk87`,
  openGraph: {
    title: "NoteHub - Share Notes Instantly Online",
    description: `Write, publish, and share notes instantly with Notehub. A simple and fast way to make your notes public with just one click. By @neuropunk87`,
    siteName: "NoteHub",
    type: "website",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub - Share Notes Instantly Online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NoteHub - Share Notes Instantly Online",
    description: `Write, publish, and share notes instantly with Notehub. A simple and fast way to make your notes public with just one click. By @neuropunk87`,
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub - Share Notes Instantly Online",
      },
    ],
    creator: "github.com/neuropunk87",
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <Toaster />
        <TanStackProvider>
          <AuthProvider>
            <Header />
            {children}
            {modal}
            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
