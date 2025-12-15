/**
 * Testing Page - DISABLED
 * 
 * This testing page has been temporarily disabled.
 * The payment system is now live on the main /program route.
 */

import { redirect } from 'next/navigation';

export default function TestingPage() {
    // Redirect to main program page
    redirect('/program');
}
