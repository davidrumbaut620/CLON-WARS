import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import Link from "next/link";
import { Facebook, Twitter, Youtube, Music, MessageSquare, FileText, Code, Box, Briefcase, ShoppingCart, Gamepad } from "lucide-react";
import { useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';
import { locales } from '@/config';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clone Wars - Open Source Clones",
  description: "A collection of open source clones of popular sites",
  viewport: "width=device-width, initial-scale=1",
};

const categories = [
  { name: "Social Media", icon: Facebook },
  { name: "Streaming", icon: Youtube },
  { name: "Productivity", icon: FileText },
  { name: "E-commerce", icon: ShoppingCart },
  { name: "Communication", icon: MessageSquare },
  { name: "Gaming", icon: Gamepad },
  { name: "Developer Tools", icon: Code },
  { name: "Others", icon: Box },
];

export default function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as any)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <head />
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-background">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                  <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                    Clone Wars
                  </Link>
                  <nav className="hidden md:flex space-x-6">
                    <Link href="/categories" className="text-muted-foreground hover:text-primary transition-colors">Categories</Link>
                    <Link href="/category/social-media" className="text-muted-foreground hover:text-primary transition-colors">Social Media</Link>
                    <Link href="/category/streaming" className="text-muted-foreground hover:text-primary transition-colors">Streaming</Link>
                    <Link href="/category/productivity" className="text-muted-foreground hover:text-primary transition-colors">Productivity</Link>
                    <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link>
                  </nav>
                  <div className="flex items-center space-x-2">
                    <LanguageToggle />
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </header>
            <main className="container mx-auto px-4 py-8">{children}</main>
            <footer className="border-t py-12">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                  {categories.map((category) => (
                    <Link 
                      key={category.name}
                      href={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <category.icon className="w-5 h-5" />
                      {category.name}
                    </Link>
                  ))}
                </div>
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="flex items-center space-x-4">
                    <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
                    <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Use</Link>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Web created by{" "}
                    <a
                      href="https://davidrt.xyz"
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium underline underline-offset-4 hover:text-primary"
                    >
                      DavidRT
                    </a>
                    . Data from{" "}
                    <a
                      href="https://github.com/GorvGoyl/Clone-Wars"
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium underline underline-offset-4 hover:text-primary"
                    >
                      Clone Wars Repository
                    </a>
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}