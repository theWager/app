import Hero from '@/assets/hero.svg'
import IconButton from '@/components/ui/Button'
import { HomeLayout } from '@/layouts/HomeLayout'
import { Cherry_Bomb_One } from 'next/font/google'
import Image from 'next/image'
const cherry = Cherry_Bomb_One({ weight: '400', subsets: ['latin'] })

const Index = () => {
  return (
    <HomeLayout>
      {' '}
      <div className='z-10 absolute left-20 top-1/2 -translate-y-1/2'>
        <h1 className='text-white font-bold text-[64px] md:text-[96px] drop-shadow-[drop-shadow(2px 4px 6px black)] leading-[90%] tracking-[-5px]  '>
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
            classes='bg-wagerLilac/50 text-white text-base font-bold inline-flex py-2 md:ml-6'
            title='Get started'
          />
          <IconButton
            classes='inline-flex px-3 py-2 rounded-lg bg-transparent text-base font-light text-gray-400 '
            href='#'
            title='Read Documentation'
          />
        </div>
      </div>
      <Image
        src={Hero}
        alt='hero'
        className='h-full absolute -z-10s top-0 right-0'
      />
      <div></div>
    </HomeLayout>
  )
}

export default Index
