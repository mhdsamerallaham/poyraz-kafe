import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'Poyraz Kafe - Online Menü',
  description: 'Lezzetin ve kalitenin buluştuğu nokta',
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className={poppins.className}>{children}</body>
    </html>
  )
}
