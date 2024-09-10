import React, { useState } from 'react'
import { Bet } from '@/util/Types'
import StatusCrumb from './ui/Status'
import { useWallet } from '@solana/wallet-adapter-react'
import PocketBase from 'pocketbase'

// Initialize PocketBase
const pb = new PocketBase('https://wager.pockethost.io')
type BetDetailsProps = Bet & {
  isJudgment: boolean
  isOpen: boolean
  onClose: () => void
  openWinnerModal: () => void
}

const BetDetails: React.FC<BetDetailsProps> = ({
  id,
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
  competitor,
  competitorAddress,
  acceptedCompetitor,
  judgeAddress,
  acceptedJudge,
  isOpen,
  onClose,
  isJudgment,
  openWinnerModal,
}) => {
  const wallet = useWallet()
  const [isAccepting, setIsAccepting] = useState(false)

  const [error, setError] = useState<string | null>(null)

  if (!isOpen) return null

  const isOpponent = wallet.publicKey?.toBase58() === competitorAddress
  const isJudge = wallet.publicKey?.toBase58() == judgeAddress

  const handleAccept = async () => {
    setIsAccepting(true)
    setError(null)
    try {
      await pb.collection('bets').update(id, { accepted_opponent: true })
      onClose() // Close the modal after successful update
    } catch (error) {
      console.error('Error accepting bet:', error)
      setError('Failed to accept bet. Please try again.')
    } finally {
      setIsAccepting(false)
    }
  }

  const handleJudgeAccept = async () => {
    setIsAccepting(true)
    setError(null)
    try {
      await pb.collection('bets').update(id, { accepted_judge: true })
      onClose() // Close the modal after successful update
    } catch (error) {
      console.error('Error accepting judging:', error)
      setError('Failed to accept judging. Please try again.')
    } finally {
      setIsAccepting(false)
    }
  }

  const handleDecline = () => {
    onClose()
  }

  return (
    <div className='z-10 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4'>
      <div className='flex flex-col bg-darknavy text-white p-6 border border-wagerBlue rounded-[20px] shadow-lg max-w-lg w-full'>
        <div className='flex justify-start items-center pb-6 border-b border-wagerBlue'>
          <h2 className='text-3xl font-bold text-green-400 mr-6'> Bet</h2>
          <StatusCrumb state={state} />
          <button
            onClick={onClose}
            className='ml-auto focus:outline-none focus:ring-2 text-3xl focus:ring-wagerBlue'
          >
            ⨯
          </button>
        </div>

        <h3 className='text-2xl font-bold mt-6'>{title}</h3>
        <p className='text-base mt-4 mb-7 font-light text-[#ECECEC]'>
          {description}
        </p>

        <div className='flex flex-col space-y-5'>
          <div className='flex justify-between'>
            <span className='text-gray-400 font-light'>Created by</span>
            <span>{createdBy}</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-400 font-light'>Bet amount</span>
            <span className='text-wagerGreen font-bold'>{amount + ' SOL'}</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-400 font-light'>Odds</span>
            <span>{ods1 + ':' + ods2}</span>
          </div>

          <div className='flex justify-between'>
            <span className='text-gray-400 font-light'>Judge</span>
            <span>{judge}</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-400 font-light'>Competitor</span>
            <span>{competitor}</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-400 font-light'>Created Date</span>
            <span>{createdDate.toLocaleDateString()}</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-400 font-light'>Expiry Date</span>
            <span>{expirationDate.toLocaleDateString()}</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-400 font-light'>Status</span>
            <span>{acceptedCompetitor ? 'Accepted' : 'Pending'}</span>
          </div>
        </div>

        {error && <p className='text-red-500 mt-4'>{error}</p>}

        {isOpponent && !isJudgment && !acceptedCompetitor && (
          <div className='flex justify-between mt-6 space-x-5'>
            <button
              onClick={handleDecline}
              className='bg-red-600/30  transition-all duration-300 hover:bg-red-700 text-red-300 rounded-lg w-full h-fit py-3'
            >
              Decline Bet
            </button>
            <button
              onClick={handleAccept}
              disabled={isAccepting}
              className='bg-green-600/30  transition-all duration-300 hover:bg-green-700 text-green-300 rounded-lg w-full h-fit py-3 disabled:opacity-50'
            >
              {isAccepting ? 'Accepting...' : 'Accept Bet'}
            </button>
          </div>
        )}

        {isJudge && !isJudgment && !acceptedJudge && (
          <div className='flex justify-between mt-6 space-x-5'>
            <button
              onClick={handleDecline}
              className='bg-red-600/30  transition-all duration-300 hover:bg-red-700 text-red-300 rounded-lg w-full h-fit py-3'
            >
              Decline Judging
            </button>
            <button
              onClick={handleJudgeAccept}
              disabled={isAccepting}
              className='bg-green-600/30  transition-all duration-300 hover:bg-green-700 text-green-300 rounded-lg w-full h-fit py-3 disabled:opacity-50'
            >
              {isAccepting ? 'Accepting...' : 'Accept Judging'}
            </button>
          </div>
        )}

        {isJudgment && (
          <div className='flex justify-between mt-6 space-x-5'>
            <button className='bg-wagerBlue/10  transition-all duration-300 hover:bg-wagerBlue/20 text-gray rounded-lg w-full h-fit py-3'>
              Cancel Bet
            </button>
            <button
              className='bg-wagerLilac  transition-all duration-300 hover:wagerLilac/80 text-white rounded-lg w-full font-bold h-fit py-3'
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
