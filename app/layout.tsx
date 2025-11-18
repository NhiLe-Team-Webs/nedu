import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Sidebar from '@/components/Sidebar'
import { CartProvider } from '@/lib/cart-context'
import CartSuccessPopup from '@/components/CartSuccessPopup'

export const metadata: Metadata = {
  title: 'N-Edu - Giáo dục chất lượng cho người Việt',
  description: 'Mang kiến thức, giáo dục chất lượng trên toàn thế giới về Việt Nam và hòa hợp với văn hóa người Việt',
  icons: {
    icon: '/logo-mobile.svg',
    shortcut: '/logo-mobile.svg',
    apple: '/logo-mobile.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body>
        <CartProvider>
          <Header />
          <div className="h-16 sm:h-20" />
          <main>{children}</main>
          <Sidebar />
          <Footer />
          <CartSuccessPopup />
        </CartProvider>
      </body>
    </html>
  )
}
