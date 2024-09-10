import Hero from '@/assets/hero.png'
import IconButton from '@/components/ui/Button'
import { HomeLayout } from '@/layouts/HomeLayout'
import { Cherry_Bomb_One } from 'next/font/google'
import Image from 'next/image'
const cherry = Cherry_Bomb_One({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: false,
})

const Index = () => {
  return (
    <HomeLayout>
      {' '}
      <div className='z-10 absolute left-20 top-2/3 lg:top-1/2 -translate-y-1/2'>
        <h1 className='text-white font-bold text-[64px] md:text-[96px] drop-shadow-[2px_4px_6px_black] leading-[90%] tracking-[-5px]  '>
          Put your{' '}
          <span
            className={`${cherry.className} text-[82px] md:text-[110px] text-wagerGreen`}
          >
            money
          </span>
          <br /> where your{' '}
          <span
            className={`${cherry.className} text-[82px] md:text-[110px] text-wagerLilac`}
          >
            mouth
          </span>{' '}
          is.
        </h1>
        <div className='flex gap-6 mt-12'>
          <IconButton
            href='/all-bets'
            classes='bg-wagerLilac/50 text-white text-base font-bold inline-flex px-6 py-2 md:ml-6 duration-300 hover:-translate-y-2 '
            title='Get started'
          />
          <IconButton
            classes='inline-flex px-6 py-2 rounded-lg bg-transparent text-base font-light text-gray-400 hover:-translate-y-2 '
            href='#'
            title='Read Documentation'
          />
        </div>
      </div>
      <Image
        src={Hero}
        alt='hero'
        className='h-auto lg:h-full absolute -z-10s top-0 right-0 w-auto'
      />
      <div></div>
    </HomeLayout>
  )
}

export default Index
