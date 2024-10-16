import { Bet } from '@/util/Types'
import React from 'react'
import { useCounterProgram } from './counter/counter-data-access'
import { PublicKey } from '@solana/web3.js';
import { BN } from '@coral-xyz/anchor';

type BetDetailsProps = Bet & {
  isOpen: boolean
  onClose: () => void
}

const PickWinner: React.FC<BetDetailsProps> = props => {
  if (!props.isOpen) return null
  const [isCreatorWinner, setIsCreatorWinner] = React.useState<boolean | null>(
    null,
  )

  const { declareWinner } = useCounterProgram()

  const pickWinnerOnChain = async () => {

    // TODO: If wager end date has not passed, do not allow to pick winner

    await declareWinner.mutateAsync({
      wagerId: new BN(props.chainId),
      wagerInitiator: new PublicKey(props.creatorAddress),
      winner: new PublicKey(isCreatorWinner ? props.creatorAddress : props.competitorAddress),
      judge: new PublicKey(props.judgeAddress),
    })
  }

  const changeWinner = (isCreator: boolean) => {
    if ((isCreatorWinner && isCreator) || (!isCreatorWinner && !isCreator))
      setIsCreatorWinner(null)
    else setIsCreatorWinner(isCreator)
  }
  if (!props.isOpen) return null

  return (
    <div className='z-10 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4'>
      <div className='flex flex-col bg-darknavy  text-white p-6 border border-wagerBlue rounded-[20px] shadow-lg max-w-lg w-full'>
        <div className='flex justify-start items-center pb-6 border-b border-wagerBlue'>
          <h2 className='text-3xl font-bold text-green-400 mr-6'>
            Pick Winner
          </h2>
          <button
            onClick={props.onClose}
            className='ml-auto focus:outline-none focus:ring-2 text-3xl focus:ring-wagerBlue'
          >
            ⨯
          </button>
        </div>

        <p className='text-base mt-4 mb-7 font-light text-[#ECECEC]	'>
          Select a rightful winner of this bet below.
        </p>

        <div className='flex flex-col space-y-5 mb-6'>
          <div
            onClick={() => changeWinner(true)}
            className={
              (isCreatorWinner ? 'bg-wagerLilac/50 border-purple-600' : '') +
              ' flex fle-row justify-start items-center border border-wagerBlue   transition-all duration-300 hover:border-purple-600 p-3 rounded-2xl'
            }
          >
            <span className='rounded-full bg-wagerLilac text-center text-white font-bold p-3 mr-6 w-12'>
              {props.createdBy[0]}
            </span>
            <h3>{props.createdBy}</h3>
          </div>
          <div
            onClick={() => changeWinner(false)}
            className={
              (!isCreatorWinner ? 'bg-wagerLilac/50 border-purple-600' : '') +
              ' flex fle-row justify-start items-center border border-wagerBlue  transition-all duration-300 hover:border-purple-600 p-3 rounded-2xl'
            }
          >
            <span className='rounded-full bg-wagerLilac text-center text-white font-bold p-3 mr-6 w-12'>
              {props.competitor[0]}
            </span>
            <h3>{props.competitor}</h3>
          </div>
        </div>

        <div className='flex justify-between mt-6 space-x-5'>
          <button className='bg-wagerBlue/10  transition-all duration-300 hover:bg-wagerBlue/20 text-gray rounded-lg w-full h-fit py-3'>
            Cancel
          </button>
          <button onClick={pickWinnerOnChain} className='bg-wagerLilac  transition-all duration-300 hover:bg-wagerLilac/70 text-white rounded-lg w-full font-bold h-fit py-3'>
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}

export default PickWinner
