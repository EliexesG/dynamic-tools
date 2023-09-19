import './custom.scss';
import '@fortawesome/fontawesome-svg-core/styles.css';

import { Roboto } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/navbar';
import Footer from './components/footer';
import ImportBsJS from './components/importBsJS';

const font = Roboto({ subsets: ['latin'], weight: '400', display: 'swap'})

export const metadata = {
  title: {
    default: 'A&M Dynamic Tools S.A.',
    template: '%s | A&M Dynamic Tools S.A.'
  },
  description: 'Somos una empresa encargada de un taller de precisión que da soporte de ingeniería a clientes en los campos de diseño mecánico, metalmecánica, mecanizado e integración de sistemas hidráulicos, naumáticos y control eléctrico.',
  icons:{
    icon: [
      '/images/favicons/favicon.ico?v=4',
    ],
    apple: [
      '/images/favicons/apple-touch.icon.png?v=4',
    ],
    shortcut: [
      '/images/favicons/apple-touch-icon.png',
    ],
    manifest: '/images/favicons/site.webmanifest',
  },
  metadataBase: new URL("https://www.aymdynamictools.com")
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body style={font.style}>
          <ImportBsJS/>
          <div>
            <Toaster
              position="top-center"
              reverseOrder={false}
            />
          </div>
          <Navbar/>
          <div className="body-content pt-5 pb-5">
            <main className='container pt-4 mt-5'>
              {children}
            </main>
          </div>
          <Footer/>
      </body>
    </html>
  )
}
