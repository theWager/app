import { Bet } from '@/util/Types'
import React from 'react'
import StatusCrumb from './ui/Status'
import Judge from '@/assets/judge.svg'
import Creator from '@/assets/creator.svg'
import Image from 'next/image'
import { BetPages } from '@/util/Enums'

type BetCardProps = Bet & {
  betsPage: BetPages
}

const BetCard: React.FC<BetCardProps> = ({
  title,
  state,
  createdBy,
  amount,
  betsPage,
  competitor,
}) => {
  return (
    <div className='bg-wagerBlue/20 rounded-xl p-6 min-w-[250px] max-w-[500px]'>
      <div className='flex justify-between items-center mb'>
        <span className='text-teal-400 font-bold'>{amount} SOL</span>
        <StatusCrumb state={state} classes='-translate-y-1' />
      </div>
      <h2 className='text-white text-xl font-bold mb'>{title}</h2>
      <div className='space-y-1'>
        <div className='flex items-center mt-1'>
          <span className='text-gray-400 mr-2 font-light'>{createdBy}</span>
          {betsPage === BetPages.JUDGING && (
            <Image src={Creator} alt='gavel' className='w-4 h-4' />
          )}
          {betsPage !== BetPages.JUDGING && (
            <Image src={Judge} alt='gavel' className='w-4 h-4' />
          )}
        </div>
        {betsPage === BetPages.JUDGING && (
          <div className='flex items-center mt-1'>
            <span className='text-gray-400 mr-2 font-light'>{competitor}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default BetCard
