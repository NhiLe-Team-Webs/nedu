import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'


import Banner from '@/components/Banner'
import { CartProvider } from '@/lib/cart-context'
import { LanguageProvider } from '@/lib/LanguageContext'
import CartSuccessPopup from '@/components/CartSuccessPopup'
import ErrorHandler from '@/components/ErrorHandler'
import Script from 'next/script'

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
    <html lang="vi" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SQ1T3SDX4Z"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SQ1T3SDX4Z');
          `}
        </Script>
      </head>
      <body>
        <LanguageProvider>
          <CartProvider>
            <ErrorHandler />
            <Script
              id="payment-error-handler"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                // Global error handler that runs after all other scripts
                (function() {
                  // Define all potentially undefined variables immediately
                  if (typeof window !== 'undefined') {
                    window.timer = window.timer || null;
                    window.updateTime = window.updateTime || function() {
                      console.log('updateTime called - timer is now defined');
                    };
                    window.vnpay = window.vnpay || {};
                    
                    // Override console.error to catch timer errors
                    const originalConsoleError = console.error;
                    console.error = function(...args) {
                      const firstArg = args[0]?.toString().toLowerCase() || '';
                      
                      // Check if this is a timer error
                      if (firstArg.includes('timer is not defined')) {
                        window.timer = window.timer || null;
                        console.log('Fixed undefined timer variable from layout script');
                        return; // Don't log error
                      }
                      
                      // Check if this is a VNPAY related error
                      if (firstArg.includes('vnpay') || firstArg.includes('payment')) {
                        console.log('VNPAY related error caught:', args[0]);
                        if (typeof window.vnpay === 'undefined') {
                          window.vnpay = {};
                        }
                      }
                      
                      // Call original console.error for other errors
                      return originalConsoleError.apply(console, args);
                    };
                    
                    // Override window.onerror for additional error catching
                    const originalWindowOnError = window.onerror;
                    window.onerror = function(message, source, lineno, colno, error) {
                      const msg = message?.toString().toLowerCase() || '';
                      
                      if (msg.includes('timer is not defined')) {
                        window.timer = window.timer || null;
                        console.log('Fixed undefined timer variable from layout window.onerror');
                        return true; // Prevent default error handling
                      }
                      
                      if (msg.includes('vnpay') || msg.includes('payment')) {
                        console.log('VNPAY related error caught from layout window.onerror:', message);
                        if (typeof window.vnpay === 'undefined') {
                          window.vnpay = {};
                        }
                      }
                      
                      // Call original error handler if it exists
                      if (originalWindowOnError) {
                        return originalWindowOnError.call(this, message, source, lineno, colno, error);
                      }
                      
                      return false;
                    };
                    
                    // Periodic check to ensure timer is always defined
                    setInterval(function() {
                      if (typeof window.timer === 'undefined') {
                        window.timer = null;
                        console.log('Timer was undefined, fixed it with periodic check from layout');
                      }
                      if (typeof window.vnpay === 'undefined') {
                        window.vnpay = {};
                      }
                    }, 500);
                    
                    // Special handling for payment pages
                    if (window.location.pathname.includes('/payment')) {
                      console.log('Payment page detected, ensuring all variables are defined from layout');
                      window.timer = window.timer || null;
                      window.vnpay = window.vnpay || {};
                      
                      // Additional safety check for payment-specific variables
                      window.vnp_ResponseCode = window.vnp_ResponseCode || null;
                      window.vnp_TxnRef = window.vnp_TxnRef || null;
                      window.vnp_Amount = window.vnp_Amount || null;
                    }
                  }
                })();
              `
              }}
            />
            <Header />
            <div className="h-24 sm:h-28 md:h-32" />
            <main className="pb-32">{children}</main>

            <Footer />

            <Banner />
            <CartSuccessPopup />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
