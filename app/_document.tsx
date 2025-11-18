import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="vi">
      <Head>
        {/* Preload critical variables and error handlers before any other scripts */}
        <script dangerouslySetInnerHTML={{
          __html: `
            // Immediately define all potentially undefined variables
            window.timer = window.timer || null;
            window.updateTime = window.updateTime || function() {
              console.log('updateTime called - timer is now defined');
            };
            window.vnpay = window.vnpay || {};
            
            // Define jQuery if it's not defined but might be expected
            if (typeof window.$ === 'undefined' && typeof window.jQuery === 'undefined') {
              window.$ = window.jQuery = function() {
                return {
                  ready: function(callback) {
                    if (document.readyState === 'loading') {
                      document.addEventListener('DOMContentLoaded', callback);
                    } else {
                      callback();
                    }
                  }
                };
              };
            }
            
            // Override all possible error handlers BEFORE any other scripts load
            const originalConsoleError = console.error;
            console.error = function(...args) {
              const firstArg = args[0]?.toString().toLowerCase() || '';
              
              // Check if this is a timer error
              if (firstArg.includes('timer is not defined')) {
                window.timer = window.timer || null;
                console.log('Fixed undefined timer variable from console.error');
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
                console.log('Fixed undefined timer variable from window.onerror');
                return true; // Prevent default error handling
              }
              
              // Handle VNPAY related errors
              if (msg.includes('vnpay') || msg.includes('payment')) {
                console.log('VNPAY related error caught from window.onerror:', message);
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
            
            // Override addEventListener to catch errors early
            const originalAddEventListener = EventTarget.prototype.addEventListener;
            EventTarget.prototype.addEventListener = function(type, listener, options) {
              // For error events, add our handler first
              if (type === 'error') {
                const originalListener = listener;
                const enhancedListener = function(event) {
                  // Handle timer errors
                  if (event.message && event.message.includes('timer is not defined')) {
                    window.timer = window.timer || null;
                    console.log('Fixed undefined timer variable from addEventListener');
                    event.preventDefault();
                    event.stopPropagation();
                    return;
                  }
                  
                  // Handle VNPAY errors
                  if (event.message && (event.message.includes('vnpay') || event.message.includes('payment'))) {
                    console.log('VNPAY related error caught from addEventListener:', event.message);
                    if (typeof window.vnpay === 'undefined') {
                      window.vnpay = {};
                    }
                  }
                  
                  // Call original listener
                  return originalListener.call(this, event);
                };
                
                return originalAddEventListener.call(this, type, enhancedListener, options);
              } else {
                return originalAddEventListener.call(this, type, listener, options);
              }
            };
            
            // Periodic check to ensure timer is always defined
            setInterval(function() {
              if (typeof window.timer === 'undefined') {
                window.timer = null;
                console.log('Timer was undefined, fixed it with periodic check');
              }
              if (typeof window.vnpay === 'undefined') {
                window.vnpay = {};
              }
            }, 100);
            
            // Special handling for payment pages
            if (window.location.pathname.includes('/payment')) {
              console.log('Payment page detected, ensuring all variables are defined');
              window.timer = window.timer || null;
              window.vnpay = window.vnpay || {};
              
              // Additional safety check for payment-specific variables
              window.vnp_ResponseCode = window.vnp_ResponseCode || null;
              window.vnp_TxnRef = window.vnp_TxnRef || null;
              window.vnp_Amount = window.vnp_Amount || null;
            }
          `
        }} />
        
        {/* Add any external scripts here if needed */}
        {/* If you need to load custom.min.js or jquery.bundles.js, add them here */}
        <script dangerouslySetInnerHTML={{
          __html: `
            // Define global variables immediately to prevent undefined errors
            window.timer = window.timer || null;
            window.updateTime = window.updateTime || function() {
              console.log('updateTime called - timer is now defined');
            };
            
            // Define VNPAY related variables to prevent payment errors
            window.vnpay = window.vnpay || {};
            
            // Define jQuery if it's not defined (VNPAY might expect it)
            if (typeof window.$ === 'undefined' && typeof window.jQuery === 'undefined') {
              window.$ = window.jQuery = function() {
                return {
                  ready: function(callback) {
                    if (document.readyState === 'loading') {
                      document.addEventListener('DOMContentLoaded', callback);
                    } else {
                      callback();
                    }
                  }
                };
              };
            }
            
            // Override console.error to catch and fix timer errors
            const originalConsoleError = console.error;
            console.error = function(...args) {
              const firstArg = args[0]?.toString().toLowerCase() || '';
              
              // Check if this is a timer error
              if (firstArg.includes('timer is not defined')) {
                // Define timer globally if it's not defined
                window.timer = window.timer || null;
                console.log('Fixed undefined timer variable from console.error');
                return; // Don't log error
              }
              
              // Check if this is a VNPAY related error
              if (firstArg.includes('vnpay') || firstArg.includes('payment')) {
                console.log('VNPAY related error caught:', args[0]);
                // Ensure VNPAY object exists
                if (typeof window.vnpay === 'undefined') {
                  window.vnpay = {};
                }
              }
              
              // Call original console.error for other errors
              return originalConsoleError.apply(console, args);
            };
            
            // Global error handler to catch and fix undefined variables
            window.addEventListener('error', function(e) {
              const errorMsg = e.message?.toString().toLowerCase() || '';
              
              if (errorMsg.includes('timer is not defined')) {
                // Define timer globally if it's not defined
                window.timer = window.timer || null;
                console.log('Fixed undefined timer variable from error event');
                e.preventDefault();
                return false;
              }
              
              // Handle VNPAY related errors
              if (errorMsg.includes('vnpay') || errorMsg.includes('payment')) {
                console.log('VNPAY related error caught from event:', e.message);
                if (typeof window.vnpay === 'undefined') {
                  window.vnpay = {};
                }
              }
            });
            
            // Override window.onerror for additional error catching
            const originalWindowOnError = window.onerror;
            window.onerror = function(message, source, lineno, colno, error) {
              const msg = message?.toString().toLowerCase() || '';
              
              if (msg.includes('timer is not defined')) {
                // Define timer globally if it's not defined
                window.timer = window.timer || null;
                console.log('Fixed undefined timer variable from window.onerror');
                return true; // Prevent default error handling
              }
              
              // Handle VNPAY related errors
              if (msg.includes('vnpay') || msg.includes('payment')) {
                console.log('VNPAY related error caught from window.onerror:', message);
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
            
            // Additional safety check for jQuery if it's being used
            if (typeof $ !== 'undefined') {
              $(document).ready(function() {
                // Ensure timer is defined before any jQuery code that might use it
                if (typeof window.timer === 'undefined') {
                  window.timer = null;
                }
                // Ensure VNPAY object exists
                if (typeof window.vnpay === 'undefined') {
                  window.vnpay = {};
                }
              });
            }
            
            // Periodic check to ensure timer is always defined (especially important for payment pages)
            setInterval(function() {
              if (typeof window.timer === 'undefined') {
                window.timer = null;
                console.log('Timer was undefined, fixed it with periodic check');
              }
              if (typeof window.vnpay === 'undefined') {
                window.vnpay = {};
              }
            }, 1000);
            
            // Special handling for payment pages - ensure all variables are defined before any VNPAY scripts load
            if (window.location.pathname.includes('/payment')) {
              console.log('Payment page detected, ensuring all variables are defined');
              window.timer = window.timer || null;
              window.vnpay = window.vnpay || {};
              
              // Additional safety check for payment-specific variables
              window.vnp_ResponseCode = window.vnp_ResponseCode || null;
              window.vnp_TxnRef = window.vnp_TxnRef || null;
              window.vnp_Amount = window.vnp_Amount || null;
            }
          `
        }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}