import { Poppins } from 'next/font/google';
import './globals.css';
import { ClientWrapper } from './ClientWrapper';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata = {
  title:       'Shortly',
  description: 'Shorten your links.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
