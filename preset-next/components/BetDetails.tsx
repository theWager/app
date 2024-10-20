import React, { useState, useEffect } from 'react'
import { Bet } from '@/util/Types'
import StatusCrumb from './ui/Status'
import { useWallet } from '@solana/wallet-adapter-react'
import PocketBase from 'pocketbase'
import { useCounterProgram } from './counter/counter-data-access'
import { PublicKey } from '@solana/web3.js'
import { BN } from '@coral-xyz/anchor'
import { CheckCircle, XCircle } from 'lucide-react'

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
  endDate,
  judge,
  chainId,
  competitor,
  creatorAddress,
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
  const [isAcceptingBet, setIsAcceptingBet] = useState(false)
  const [isAcceptingJudging, setIsAcceptingJudging] = useState(false)
  const { acceptWager, acceptJudging } = useCounterProgram()
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    type: 'success' as 'success' | 'error',
  })


  useEffect(() => {
    if (snackbar.open) {
      const timer = setTimeout(() => {
        setSnackbar(prev => ({ ...prev, open: false }))
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [snackbar.open])

  if (!isOpen) return null

  const isCreator = wallet.publicKey?.toBase58() === creatorAddress
  const isOpponent = wallet.publicKey?.toBase58() === competitorAddress 
    
  const isOpenBet = wallet.publicKey?.toBase58() && competitorAddress === ''
  const isJudge = wallet.publicKey?.toBase58() === judgeAddress

  const handleAccept = async () => {
    setIsAcceptingBet(true)
    setError(null)

    try {
      await acceptWager.mutateAsync({
        wagerId: new BN(chainId),
        wagerInitiator: new PublicKey(creatorAddress),
        opponent: wallet.publicKey!,
        wagerAmount: amount,
        odds1: ods1,
        odds2: ods2,
      })

      await pb.collection('bets').update(id, { accepted_opponent: true })

      setSnackbar({
        open: true,
        message: 'Bet accepted successfully!',
        type: 'success',
      })

      setTimeout(() => {
        onClose()
      }, 1950)
    } catch (error) {
      console.error('Error accepting bet:', error)
      setError('Failed to accept wager. Please try again.')
      setSnackbar({
        open: true,
        message: 'Error accepting wager. Please try again.',
        type: 'error',
      })
    } finally {
      setIsAcceptingBet(false)
    }
  }

  const handleJudgeAccept = async () => {
    setIsAcceptingJudging(true)
    setError(null)
    try {
      await acceptJudging.mutateAsync({
        wagerId: new BN(chainId),
        wagerInitiator: new PublicKey(creatorAddress),
        judge: wallet.publicKey!,
      })

      await pb.collection('bets').update(id, { accepted_judge: true })

      setSnackbar({
        open: true,
        message: 'Judging accepted successfully!',
        type: 'success',
      })

      setTimeout(() => {
        onClose()
      }, 1950)
    } catch (error) {
      console.error('Error accepting judging:', error)
      setError('Failed to accept judging. Please try again.')
      setSnackbar({
        open: true,
        message: 'Error accepting judging. Please try again.',
        type: 'error',
      })
    } finally {
      setIsAcceptingJudging(false)
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    setError(null)
    try {
      await pb.collection('bets').delete(id)
      setSnackbar({
        open: true,
        message: 'Bet deleted successfully!',
        type: 'success',
      })
      setTimeout(() => {
        onClose()
      }, 1950)
    } catch (error) {
      console.error('Error deleting bet:', error)
      setError('Failed to delete bet. Please try again.')
      setSnackbar({
        open: true,
        message: 'Error deleting bet. Please try again.',
        type: 'error',
      })
    } finally {
      setIsDeleting(false)
    }
  }

  const handleDecline = () => {
    onClose()
  }

  return (
    <div className='z-30 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4'>
      <div className='flex flex-col bg-darknavy text-white p-6 border border-wagerBlue rounded-[20px] shadow-lg max-w-lg w-full'>
        <div className='flex justify-start items-center pb-6 border-b border-wagerBlue'>
          <h2 className='text-3xl font-bold text-green-400 mr-6'> theWager</h2>
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
            <span className='text-gray-400 font-light'>Amount</span>
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
            <span>{`${createdDate.toLocaleDateString()} ${createdDate.toLocaleTimeString(
              [],
              { hour: '2-digit', minute: '2-digit' },
            )}`}</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-400 font-light'>Expiry Date</span>
            <span>{`${expirationDate.toLocaleDateString()} ${expirationDate.toLocaleTimeString(
              [],
              { hour: '2-digit', minute: '2-digit' },
            )}`}</span>
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
              disabled={isAcceptingBet}
              className='bg-green-600/30  transition-all duration-300 hover:bg-green-700 text-green-300 rounded-lg w-full h-fit py-3 disabled:opacity-50'
            >
              {isAcceptingBet ? 'Accepting...' : 'Accept Wager'}
            </button>
          </div>
        )}

        {isOpenBet && (
          <div className='flex justify-between mt-6 space-x-5'>
          <button
            onClick={handleAccept}
            disabled={isAcceptingBet}
            className='bg-green-600/30  transition-all duration-300 hover:bg-green-700 text-green-300 rounded-lg w-full h-fit py-3 disabled:opacity-50'
          >
            {isAcceptingBet ? 'Accepting...' : 'Accept Wager'}
          </button>
        </div>
        )}

        {isJudge && isJudgment && !acceptedJudge && (
          <div className='flex justify-between mt-6 space-x-5'>
            <button
              onClick={handleDecline}
              className='bg-red-600/30  transition-all duration-300 hover:bg-red-700 text-red-300 rounded-lg w-full h-fit py-3'
            >
              Decline Judging
            </button>
            <button
              onClick={handleJudgeAccept}
              disabled={isAcceptingJudging}
              className='bg-green-600/30  transition-all duration-300 hover:bg-green-700 text-green-300 rounded-lg w-full h-fit py-3 disabled:opacity-50'
            >
              {isAcceptingJudging ? 'Accepting...' : 'Accept Judging'}
            </button>
          </div>
        )}

        {isJudgment && acceptedJudge && acceptedCompetitor && new Date() >= endDate && (
          <div className='flex justify-between mt-6 space-x-5'>
            <button className='bg-wagerBlue/10  transition-all duration-300 hover:bg-wagerBlue/20 text-gray rounded-lg w-full h-fit py-3'>
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

        {isCreator && !isAcceptingJudging && (
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className='mt-6 bg-red-600/30 transition-all duration-300 hover:bg-red-700 text-red-300 rounded-lg w-full h-fit py-3 disabled:opacity-50'
          >
            {isDeleting ? 'Deleting...' : 'Delete Bet'}
          </button>
        )}

        {snackbar.open && (
          <div
            className={`fixed bottom-4 right-4 px-4 py-2 rounded-md shadow-lg flex items-center space-x-2 ${
              snackbar.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {snackbar.type === 'success' ? (
              <CheckCircle className='text-white' size={20} />
            ) : (
              <XCircle className='text-white' size={20} />
            )}
            <p className='text-white'>{snackbar.message}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default BetDetails
