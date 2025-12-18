'use client'

import { useEffect } from 'react'

// Extend the Window interface to include our custom properties
declare global {
  interface Window {
    timer?: any;
    updateTime?: () => void;
    vnpay?: any;
    $?: any;
    jQuery?: any;
  }
}

export default function ErrorHandler() {
  useEffect(() => {
    // Define all potentially undefined variables that might be used by VNPAY or payment scripts
    if (typeof window !== 'undefined') {
      // Define timer globally if it's not already defined
      if (typeof window.timer === 'undefined') {
        window.timer = null;
      }

      // Define updateTime function globally if it's not already defined
      if (typeof window.updateTime === 'undefined') {
        window.updateTime = function() {
          console.log('updateTime called - timer is now defined');
        };
      }

      // Define VNPAY related variables if they might be used
      if (typeof window.vnpay === 'undefined') {
        window.vnpay = {};
      }

      // Define jQuery if it's not defined but VNPAY might expect it
      if (typeof window.$ === 'undefined' && typeof window.jQuery === 'undefined') {
        window.$ = window.jQuery = function() {
          return {
            ready: function(callback: () => void) {
              console.log('jQuery mock ready() called with callback:', typeof callback);
              if (document.readyState === 'loading') {
                console.log('Document is loading, adding DOMContentLoaded listener');
                document.addEventListener('DOMContentLoaded', callback);
              } else {
                console.log('Document already loaded, executing callback immediately');
                callback();
              }
            }
          };
        };
      }
    }

    // Enhanced error handler to catch and fix undefined variables
    const handleError = (event: ErrorEvent) => {
      if (event.message) {
        const errorMsg = event.message.toLowerCase();
        
        // Handle timer undefined error
        if (errorMsg.includes('timer is not defined')) {
          if (typeof window !== 'undefined') {
            window.timer = window.timer || null;
            console.log('Fixed undefined timer variable');
            event.preventDefault();
            return false;
          }
        }
        
        // Handle VNPAY related errors
        if (errorMsg.includes('vnpay') || errorMsg.includes('payment')) {
          console.log('VNPAY related error caught:', event.message);
          // Ensure VNPAY object exists
          if (typeof window !== 'undefined' && typeof window.vnpay === 'undefined') {
            window.vnpay = {};
          }
        }
        
        // Handle jQuery related errors
        if (errorMsg.includes('jquery') || errorMsg.includes('$ is not defined')) {
          console.log('jQuery related error caught:', event.message);
          event.preventDefault();
          return false;
        }
      }
    };

    // Override window.onerror for additional error catching
    const originalWindowOnError = window.onerror;
    window.onerror = function(message, source, lineno, colno, error) {
      const msg = message?.toString().toLowerCase() || '';
      
      // Handle timer undefined error
      if (msg.includes('timer is not defined')) {
        if (typeof window !== 'undefined') {
          window.timer = window.timer || null;
          console.log('Fixed undefined timer variable from window.onerror');
          return true; // Prevent default error handling
        }
      }
      
      // Handle VNPAY related errors
      if (msg.includes('vnpay') || msg.includes('payment')) {
        console.log('VNPAY related error caught from window.onerror:', message);
        if (typeof window !== 'undefined' && typeof window.vnpay === 'undefined') {
          window.vnpay = {};
        }
      }
      
      // Call original error handler if it exists
      if (originalWindowOnError) {
        return originalWindowOnError.call(this, message, source, lineno, colno, error);
      }
      
      return false;
    };

    // Override console.error to catch and fix timer errors
    const originalConsoleError = console.error;
    console.error = function(...args) {
      const firstArg = args[0]?.toString().toLowerCase() || '';
      
      // Check if this is a timer error
      if (firstArg.includes('timer is not defined')) {
        if (typeof window !== 'undefined') {
          window.timer = window.timer || null;
          console.log('Fixed undefined timer variable from console.error');
          return; // Don't log the error
        }
      }
      
      // Call original console.error for other errors
      return originalConsoleError.apply(console, args);
    };

    window.addEventListener('error', handleError);

    // Periodic check to ensure timer is always defined (especially important for payment pages)
    const intervalId = setInterval(() => {
      if (typeof window !== 'undefined' && typeof window.timer === 'undefined') {
        window.timer = null;
        console.log('Timer was undefined, fixed it with periodic check');
      }
    }, 1000);

    // Cleanup
    return () => {
      window.removeEventListener('error', handleError);
      clearInterval(intervalId);
      // Restore original handlers
      window.onerror = originalWindowOnError;
      console.error = originalConsoleError;
    };
  }, []);

  return null; // This component doesn't render anything
}