import { useWallet } from '@solana/wallet-adapter-react'
import PocketBase from 'pocketbase'
import React, { useState } from 'react'

// Initialize PocketBase
const pb = new PocketBase('https://wager.pockethost.io')
type HowItWorksProps = {
    isOpen: boolean
    onClose: () => void
}

const HowItWorksModal: React.FC<HowItWorksProps> = ({
    isOpen,
    onClose,
}) => {
    const [error, setError] = useState<string | null>(null)

    if (!isOpen) return null


    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4'>
            <div className='flex flex-col bg-darknavy text-white p-6 border border-wagerBlue rounded-[20px] shadow-lg max-w-lg w-full z-50 '>
                <div className='flex justify-start items-center pb-6 border-b border-wagerBlue'>
                    <h2 className='text-3xl font-bold text-green-400 mr-6'> theWager</h2>
                    <button
                        onClick={onClose}
                        className='ml-auto focus:outline-none focus:ring-2 text-3xl focus:ring-wagerBlue'
                    >
                        ⨯
                    </button>
                </div>

                <h3 className='text-2xl font-bold mt-6'>{"title"}</h3>
                <p className='text-base mt-4 mb-7 font-light text-[#ECECEC]'>
                    {"Mate napisi nesto."}
                </p>
            </div>
        </div>
    )
}

export default HowItWorksModal
