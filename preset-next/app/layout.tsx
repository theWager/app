import { Inter } from 'next/font/google'
import './global.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'theWager',
  description: 'Wager with anyone about anything...',
  openGraph: {
    title: 'theWager',
    description: 'Wager with anyone about anything...',
    url: 'https://thewager.lol',
    siteName: 'theWager',
    images: [
      {
        url: 'https://opengraph.b-cdn.net/production/images/2bb6ba91-eb3d-43cc-894c-cbd621af74e3.png?token=srOJ_6X-DyW9vC6CHNhQ2BOaPQNZFlIXG8ihUscrtEI&height=638&width=1200&expires=33265184102',
        width: 1200,
        height: 638,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'theWager',
    description: 'Wager with anyone about anything...',
    images: ['https://opengraph.b-cdn.net/production/images/2bb6ba91-eb3d-43cc-894c-cbd621af74e3.png?token=srOJ_6X-DyW9vC6CHNhQ2BOaPQNZFlIXG8ihUscrtEI&height=638&width=1200&expires=33265184102'],
  },
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
