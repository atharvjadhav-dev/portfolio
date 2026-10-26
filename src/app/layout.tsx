import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Atharv Jadhav | Cloud & DevOps Engineer",
  description:
    "Personal workspace and portfolio of Atharv Jadhav — specializing in cloud infrastructure, containerization, CI/CD pipelines, and infrastructure as code.",
  keywords: [
    "Atharv Jadhav",
    "DevOps Engineer",
    "Cloud Engineer",
    "AWS",
    "Docker",
    "Kubernetes",
    "Terraform",
    "CI/CD",
    "Linux",
  ],
  authors: [{ name: "Atharv Jadhav", url: "https://github.com/atharvjadhav-dev" }],
  creator: "Atharv Jadhav",
  metadataBase: new URL("https://atharvjadhav.xyz"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://atharvjadhav.xyz",
    title: "Atharv Jadhav | Cloud & DevOps Engineer",
    description:
      "Building reliable systems. Automating everything else. Explore cloud infrastructure, Terraform modules, and containerized deployments.",
    siteName: "Atharv Jadhav Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Atharv Jadhav | Cloud & DevOps Engineer",
    description: "Cloud infrastructure, containerization, CI/CD, and automation.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth dark`}
    >
      <body className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] font-sans antialiased selection:bg-[#39FF88]/20 selection:text-[#39FF88] flex flex-col">
        {children}
      </body>
    </html>
  );
}
