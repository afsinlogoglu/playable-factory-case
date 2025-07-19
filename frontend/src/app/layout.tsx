import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '../contexts/AuthContext'
import { CartProvider } from '../contexts/CartContext'
import { WishlistProvider } from '../contexts/WishlistContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'E-Ticaret Platformu - Modern Alışveriş Deneyimi',
  description: 'En kaliteli ürünleri uygun fiyatlarla bulabileceğiniz modern e-ticaret platformu',
  keywords: 'e-ticaret, online alışveriş, elektronik, moda, ev dekorasyonu',
  authors: [{ name: 'E-Ticaret Team' }],
  openGraph: {
    title: 'E-Ticaret Platformu',
    description: 'Modern alışveriş deneyimi',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <div className="min-h-screen bg-gray-50">
                {children}
              </div>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
