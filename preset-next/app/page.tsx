'use client'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import AllBetsHeader from '@/sections/AllBets'
import CategoryGridCarousel from '@/sections/PublicWagers'
import { BetPages } from '@/util/Enums'
import { BetsMapper } from '@/util/ORM'
import { PocketBaseBet, PocketBaseUser } from '@/util/PocketbaseTypes'
import { Bet } from '@/util/Types'
import PocketBase from 'pocketbase'
import { useEffect, useState } from 'react'

const pb = new PocketBase('https://wager.pockethost.io')

export default function AllBets() {
  const [allBets, setAllBets] = useState<Bet[]>([])


  const fetchBets = async () => {
    try {

      const storedBets = await pb
        .collection('bets')
        .getFullList<PocketBaseBet>({
          sort: '-created',
        })


      const storedUsers = await pb
        .collection('users')
        .getFullList<PocketBaseUser>({
          sort: '-created',
        })

      const transformedBets = BetsMapper(storedBets, storedUsers)

      setAllBets(transformedBets)


    } catch (error) {
      console.error('Error fetching bets:', error)
    }
  }

  useEffect(() => {
    fetchBets()
  }, [])

  return (
    <DashboardLayout>
      <div className='p-4 flex flex-col gap-y-4 bg-darknavy'>
        <CategoryGridCarousel />
        <AllBetsHeader
          isLoggedIn
          title='All Wagers'
          bets={allBets}
          page={BetPages.ALL}
        />
      </div>
    </DashboardLayout>
  )
}
