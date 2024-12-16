import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import {ClerkProvider} from '@clerk/nextjs'
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "sonner";
import ReactQueryProvider from "@/providers/react-query-provider";
import ReduxProvider from "@/providers/redux-providers";
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Slide",
  description: "Automate DMS on instagrams",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={jakarta.className} suppressHydrationWarning>
      <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <ReduxProvider>
            <ReactQueryProvider>
            {children}
            </ReactQueryProvider>
            </ReduxProvider>
            <Toaster />
          </ThemeProvider>
        </body>
    </html>
    </ClerkProvider>
  );
}
