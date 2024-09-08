import React from 'react'
import IconButton from '@/components/ui/Button'
import Plus from '@/assets/plus.svg'
import Search from '@/assets/search.svg'
import Sort from '@/assets/sort.svg'
import BetCard from '@/components/BetCard'
import Image from 'next/image'
import { BetPages } from '@/util/Enums'
import { Bet } from '@/util/Types'

interface AllBetsHeaderProps {
  isLoggedIn: boolean
  page: BetPages
  title: string
  bets: Bet[]
}

const AllBetsHeader: React.FC<AllBetsHeaderProps> = ({
  isLoggedIn,
  title,
  page,
  bets,
}) => {
  return (
    <div
      className={`bg-navy-900 rounded-2xl shadow-lg border border-wagerBlue p-6`}
    >
      <div className='flex items-center justify-between pb-6 pt-1 border-b border-wagerBlue'>
        <div className='flex items-center'>
          <h1 className='text-xl sm:text-3xl font-bold text-teal-400'>
            {title}
          </h1>
          {page === BetPages.ALL && (
            <IconButton
              icon={Plus}
              href='#'
              classes='bg-wagerLilac/50 text-white text-base font-bold inline-flex py-2 ml-5 md:ml-6'
              disabled={!isLoggedIn}
              title='Create a Bet'
            />
          )}
        </div>
        <div className='flex items-center space-x-2 sm:space-x-4'>
          <div className='relative hidden md:block'>
            <input
              type='text'
              placeholder='Search'
              className='pl-10 pr-3 py-2 w-40 sm:w-auto rounded-lg bg-wagerBlue/20 text-white text-base font-light focus:outline-none focus:border-purple-500'
            />
            <Image
              src={Search}
              alt='search'
              className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
            />
          </div>
          <IconButton
            icon={Sort}
            classes='inline-flex px-3 py-2 rounded-lg bg-wagerBlue/20 text-base font-light text-gray-400 '
            href='#'
            title='Sort'
          />
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-6'>
        {bets.map(bet => (
          <BetCard {...bet} betsPage={BetPages.ALL} />
        ))}
      </div>
    </div>
  )
}

export default AllBetsHeader
