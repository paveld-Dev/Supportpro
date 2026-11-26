import type { Metadata } from 'next';
import { Inter, Instrument_Serif } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { CustomCursor } from '@/components/custom-cursor';
import { Chatbot } from '@/components/chatbot';

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
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/favicon-32x32.png',
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
        {/* Inline theme script — runs before hydration to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=new URLSearchParams(window.location.search).get('theme');var t=p||localStorage.getItem('theme');if(t==='light'){document.documentElement.removeAttribute('data-theme');document.documentElement.classList.remove('dark');}else if(t==='dark'||t===null){document.documentElement.setAttribute('data-theme','dark');document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <Providers>
          <CustomCursor />
          {children}
          <Chatbot />
        </Providers>
      </body>
    </html>
  );
}
