import './globals.css'
import { Inter } from 'next/font/google'
import { UserContextProvider } from '@/context/UserContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AktivIQ',
  description: 'Desgined and Developed by ARDIF Technologies',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <UserContextProvider>
        <body className={inter.className}>{children}</body>
      </UserContextProvider>
    </html>
  )
}
