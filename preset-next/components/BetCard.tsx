import { Bet } from '@/util/Types'
import React, { useState } from 'react'
import StatusCrumb from './ui/Status'
import Judge from '@/assets/judge.svg'
import Creator from '@/assets/creator.svg'
import Image from 'next/image'
import { BetPages } from '@/util/Enums'
import BetDetails from './BetDetails'
import PickWinner from './PickWinner'

type BetCardProps = Bet & {
  betsPage: BetPages
  onClick?: () => void // New prop for click handler
}

const BetCard: React.FC<BetCardProps> = props => {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [isWinnerModalOpen, setIsWinnerModalOpen] = useState(false)

  const openDetailsModal = () => setIsDetailsModalOpen(true)
  const closeDetailsModal = () => setIsDetailsModalOpen(false)

  const openWinnerModal = () => {
    closeDetailsModal()
    setIsWinnerModalOpen(true)
  }
  const closeWinnerModal = () => setIsWinnerModalOpen(false)

  return (
    <>
      <div
        className='bg-wagerBlue/20 rounded-xl p-6 min-w-[250px] max-w-[500px] hover:cursor-pointer'
        onClick={openDetailsModal}
      >
        <div className='flex justify-between items-center mb'>
          <span className='text-teal-400 font-bold'>{props.amount} SOL</span>
          <StatusCrumb state={props.state} classes='-translate-y-1' />
        </div>
        <h2 className='text-white text-xl font-bold mb'>{props.title}</h2>
        <div className='space-y-1'>
          <div className='flex items-center mt-1'>
            <span className='text-gray-400 mr-2 font-light'>
              {props.createdBy}
            </span>
            {props.betsPage === BetPages.JUDGING && (
              <Image src={Creator} alt='gavel' className='w-4 h-4' />
            )}
            {props.betsPage !== BetPages.JUDGING && (
              <Image src={Judge} alt='gavel' className='w-4 h-4' />
            )}
          </div>
          {props.betsPage === BetPages.JUDGING && (
            <div className='flex items-center mt-1'>
              <span className='text-gray-400 mr-2 font-light'>
                {props.competitor}
              </span>
            </div>
          )}
        </div>
      </div>
      <BetDetails
        isJudgment={props.betsPage === BetPages.JUDGING}
        isOpen={isDetailsModalOpen}
        onClose={closeDetailsModal}
        openWinnerModal={openWinnerModal}
        {...props}
      />
      <PickWinner
        isOpen={isWinnerModalOpen}
        onClose={closeWinnerModal}
        {...props}
      />
    </>
  )
}

export default BetCard
