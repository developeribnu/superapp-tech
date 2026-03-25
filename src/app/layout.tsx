import type { Metadata } from "next";
import { Sidebar } from "@/components/sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "TechHub - AI & Tools Superapp",
  description: "Your complete tech and AI resource hub with 350+ tools",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="w-full overflow-auto md:ml-64">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
