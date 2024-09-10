import { Bet } from '@/util/Types'
import React from 'react'
import StatusCrumb from './ui/Status'
type BetDetailsProps = Bet & {
  isJudgment: boolean
  isOpen: boolean
  onClose: () => void
  openWinnerModal: () => void
}

const BetDetails: React.FC<BetDetailsProps> = ({
  state,
  title,
  description,
  createdBy,
  createdDate,
  expirationDate,
  ods1,
  ods2,
  amount,
  judge,
  isOpen,
  isJudgment,
  onClose,
  openWinnerModal,
}) => {
  if (!isOpen) return null

  return (
    <div className='z-10 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4'>
      <div className='flex flex-col bg-darknavy  text-white p-6 border border-wagerBlue rounded-[20px] shadow-lg max-w-lg w-full'>
        <div className='flex justify-start items-center pb-6 border-b border-wagerBlue'>
          <h2 className='text-3xl font-bold text-green-400 mr-6'>Sports Bet</h2>
          <StatusCrumb state={state} />
          <button
            onClick={onClose}
            className='ml-auto focus:outline-none focus:ring-2 text-3xl focus:ring-wagerBlue'
          >
            ⨯
          </button>
        </div>

        <h3 className='text-2xl font-bold mt-6'>{title}</h3>
        <p className='text-base mt-4 mb-7 font-light text-[#ECECEC]	'>
          {description}
        </p>

        <div className='flex flex-col space-y-5'>
          <div className='flex justify-between'>
            <span className='text-gray-400 font-light'>Created by</span>
            <span>{createdBy}</span>
          </div>{' '}
          <div className='flex justify-between'>
            <span className='text-gray-400 font-light'>Bet amount</span>
            <span className='text-wagerGreen font-bold'>{amount + ' SOL'}</span>
          </div>{' '}
          <div className='flex justify-between'>
            <span className='text-gray-400 font-light'>Odds</span>
            <span>{ods1 + ':' + ods2}</span>
          </div>{' '}
          <div className='flex justify-between'>
            <span className='text-gray-400 font-light'>Category</span>
            <span>{'Sports'}</span>
          </div>{' '}
          <div className='flex justify-between'>
            <span className='text-gray-400 font-light'>Judge</span>
            <span>{judge}</span>
          </div>{' '}
          <div className='flex justify-between'>
            <span className='text-gray-400 font-light'>Expiry Date</span>
            <span>{expirationDate.toDateString()}</span>
          </div>
        </div>
        {!isJudgment && (
          <div className='flex justify-between mt-6 space-x-5'>
            <button className='bg-green-600/30 transition-all duration-300 hover:bg-green-700 text-green-300 rounded-lg w-full h-fit	py-3'>
              Accept Bet
            </button>
            <button className='bg-red-600/30 transition-all duration-300 hover:bg-red-700 text-red-300 rounded-lg w-full h-fit py-3'>
              Decline Bet
            </button>
          </div>
        )}
        {isJudgment && (
          <div className='flex justify-between mt-6 space-x-5'>
            <button className='bg-wagerBlue/10 transition-all duration-300 hover:bg-wagerBlue/20 text-gray rounded-lg w-full h-fit py-3'>
              Cancel Bet
            </button>
            <button
              className='bg-wagerLilac transition-all duration-300 hover:wagerLilac/80 text-white rounded-lg w-full font-bold h-fit py-3'
              onClick={openWinnerModal}
            >
              Pick winner
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default BetDetails
