import type { Metadata, Viewport } from "next";
import { Inter_Tight, Montserrat } from "next/font/google";
import { Shell } from "@/components/Chrome";
import { posthogSnippet } from "@/lib/posthog";
import "./globals.css";

// Montserrat is Dynamic EMS's own typeface and carries the UI. Inter Tight stands in for Heart Aerospace's
// Neue Haas Grotesk Display and is kept for the hero and a few headline moments.
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-ui", display: "swap" });
const display = Inter_Tight({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Dynamic EMS | Electronic Contract Manufacturing Service Provider", template: "%s | Dynamic EMS" },
  description: "Dynamic EMS offers a tailor-made, customised Electronics Manufacturing Service to customers with a complex, highly-diversified business. From design to distribution.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export const viewport: Viewport = { themeColor: "#0a0a0b" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${montserrat.variable} ${display.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: posthogSnippet }} />
        <noscript><style>{"[data-rise],[data-clip]{visibility:visible!important;opacity:1!important}"}</style></noscript>
      </head>
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
