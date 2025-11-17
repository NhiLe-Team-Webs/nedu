import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Sidebar from '@/components/Sidebar'

export const metadata: Metadata = {
  title: 'N-Edu - Giáo dục chất lượng cho người Việt',
  description: 'Mang kiến thức, giáo dục chất lượng trên toàn thế giới về Việt Nam và hòa hợp với văn hóa người Việt',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body>
        <Header />
        <div className="h-20" />
        <main>{children}</main>
        <Sidebar />
        <Footer />
      </body>
    </html>
  )
}
