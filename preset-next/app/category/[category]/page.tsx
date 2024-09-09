'use client'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import AllBetsHeader from '@/sections/AllBets'
import { BetPages } from '@/util/Enums'
import { MOCK_BETS } from '@/util/Mocks'
import { useParams } from 'next/navigation'

export default function MyBets() {
  const { category } = useParams()

  return (
    <DashboardLayout>
      <div className=' p-4 flex flex-col gap-y-4 bg-darknavy'>
        <AllBetsHeader
          isLoggedIn
          title={`${category as string} Bets`}
          bets={MOCK_BETS}
          page={BetPages.MY_BETS}
        />
      </div>
    </DashboardLayout>
  )
}
