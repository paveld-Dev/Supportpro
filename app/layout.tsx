import type { Metadata } from 'next';
import { Inter, Instrument_Serif } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { CustomCursor } from '@/components/custom-cursor';
import { Chatbot } from '@/components/chatbot';
import { LoadingScreen } from '@/components/loading-screen';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const instrumentSerif = Instrument_Serif({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://supportpro.com'),
  title: 'SupportPRO — Managed IT & 24/7 Technical Support',
  description:
    'SupportPRO delivers 24/7 technical support, cloud and server management, NOC, DevOps, and white-label MSP services trusted by hosting providers and enterprises worldwide.',
  openGraph: {
    title: 'SupportPRO — Managed IT & 24/7 Technical Support',
    description:
      'SupportPRO delivers 24/7 technical support, cloud and server management, NOC, DevOps, and white-label MSP services trusted by hosting providers and enterprises worldwide.',
    type: 'website',
    images: [
      {
        url: '/hero.png',
        width: 1200,
        height: 630,
        alt: 'SupportPRO Managed IT & Technical Support',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SupportPRO — Managed IT & 24/7 Technical Support',
    description:
      'SupportPRO delivers 24/7 technical support, cloud and server management, NOC, DevOps, and white-label MSP services trusted by hosting providers and enterprises worldwide.',
    images: ['/hero.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable}`} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" />
        {/* Inline theme & session loader script — runs before hydration to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||t===null){document.documentElement.setAttribute('data-theme','dark');}if(sessionStorage.getItem('supportpro_session_loaded')){document.documentElement.classList.add('sp-loaded');}}catch(e){}})();`,
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html.sp-loaded #sp-loading-screen { display: none !important; }
              html:not(.sp-loaded) body > *:not(#sp-loading-screen) {
                visibility: hidden !important;
                opacity: 0 !important;
                pointer-events: none !important;
              }
            `,
          }}
        />
      </head>
      <body>
        <LoadingScreen />
        <Providers>
          <CustomCursor />
          {children}
          <Chatbot />
        </Providers>
      </body>
    </html>
  );
}
