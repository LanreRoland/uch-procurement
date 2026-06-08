import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UCH Procurement | University College Hospital, Ibadan",
  description:
    "Official Procurement portal of University College Hospital (UCH), Ibadan. Tenders, contract awards, and procurement notices.",
  keywords: ["UCH", "procurement", "tender", "University College Hospital", "Ibadan", "Nigeria"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
