'use client'

import './custom.scss';
import '@fortawesome/fontawesome-svg-core/styles.css';

import { Roboto } from 'next/font/google';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/navbar';
import Footer from './components/footer';

const font = Roboto({ subsets: ['latin'], weight: '400', display: 'swap'})

export const metadata = {
  title: 'A&M Dynamic Tools S.A.',
  description: 'app for A&M Dynamic Tools S.A.',
}

export default function RootLayout({ children }) {

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <html lang="es">
      <body style={font.style}>
          <div>
            <Toaster
              position="top-center"
              reverseOrder={false}
            />
          </div>
          <Navbar/>
          <div className="body-content pt-5 pb-5">
            <main className='p-4 m-4 mt-5'>
              {children}
            </main>
          </div>
          <Footer/>
      </body>
    </html>
  )
}
