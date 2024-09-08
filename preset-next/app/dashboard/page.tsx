'use client'
import { useState } from 'react'
import CreateBetModal from '@/components/createBetModal'
import BetGridCarousel from '@/sections/FeaturedBets'
import { AppHero } from '@/components/ui/Misc'
import { MOCK_BINARY_BETS } from '@/util/Mocks'
import AllBetsHeader from '@/sections/AllBets'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { MOCK_BETS } from '@/util/Mocks'
import { BetPages } from '@/util/Enums'

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <DashboardLayout>
      <div className=' p-4 flex flex-col gap-y-4 bg-darknavy'>
        <BetGridCarousel bets={MOCK_BINARY_BETS} />
        <AllBetsHeader
          isLoggedIn
          title='All Bets'
          bets={MOCK_BETS}
          page={BetPages.ALL}
        />
        <AppHero title='gm' subtitle='Say hi to your new Solana dApp.' />
        <div className='max-w-xl mx-auto py-6 sm:px-6 lg:px-8 text-center'>
          <button
            onClick={openModal}
            className='px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500'
          >
            Create New Bet
          </button>
          <CreateBetModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
      </div>
    </DashboardLayout>
  )
}
