'use client'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import AllBetsHeader from '@/sections/AllBets'
import { BetPages } from '@/util/Enums'
import { MOCK_BETS } from '@/util/Mocks'

export default function MyBets() {
  return (
    <DashboardLayout>
      <div className=' p-4 flex flex-col gap-y-4 bg-darknavy'>
        <AllBetsHeader
          isLoggedIn
          title='My Judging'
          bets={MOCK_BETS}
          page={BetPages.JUDGING}
        />
      </div>
    </DashboardLayout>
  )
}
