import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '../context/LanguageContext';
import { CartProvider } from '../context/CartContext';
import { Navbar } from '../components/Navbar';
import { CartDrawer } from '../components/CartDrawer';
import { Footer } from '../components/Footer';

export const metadata: Metadata = {
  title: 'Saraya Japanese Dining | 沙羅屋 - 本格和食ダイニング',
  description:
    'Nikmati kelezatan otentik kuliner Jepang di Saraya Dining (沙羅屋). Dari Sushi, Sashimi segar Toyosu, Tori Paitan Ramen kental, hingga reservasi Tatami Room dan Counter Bar.',
  keywords: [
    'Restoran Jepang',
    'Japanese Restaurant',
    'Saraya Dining',
    '沙羅屋',
    'Sushi Jakarta',
    'Ramen Halal',
    'Tatami Room',
    '和食',
    '寿司',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-sumi-950 text-bamboo-100 antialiased selection:bg-torii-600 selection:text-white">
        <LanguageProvider>
          <CartProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <CartDrawer />
            </div>
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
