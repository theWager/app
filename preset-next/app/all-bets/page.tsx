'use client'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import AllBetsHeader from '@/sections/AllBets'
import BetGridCarousel from '@/sections/FeaturedBets'
import CategoryGridCarousel from '@/sections/PublicWagers'
import { BetPages } from '@/util/Enums'
import { MOCK_BINARY_BETS } from '@/util/Mocks'
import { BetsMapper } from '@/util/ORM'
import { PocketBaseBet, PocketBaseUser } from '@/util/PocketbaseTypes'
import { Bet } from '@/util/Types'
import PocketBase from 'pocketbase'
import { useEffect, useState } from 'react'

const pb = new PocketBase('https://wager.pockethost.io')

export default function AllBets() {
  const [allBets, setAllBets] = useState<Bet[]>([])
  const [featuredBets, setFeaturedBets] = useState<Bet[]>([])

  const fetchBets = async () => {
    try {
      // Fetch all bets
      const storedBets = await pb
        .collection('bets')
        .getFullList<PocketBaseBet>({
          sort: '-created',
        })

      // Fetch all users
      const storedUsers = await pb
        .collection('users')
        .getFullList<PocketBaseUser>({
          sort: '-created',
        })

      // Transform the bets
      const transformedBets = BetsMapper(storedBets, storedUsers)

      // Set the transformed bets to the state
      setAllBets(transformedBets)

      // For featured bets, take the first 5 bets
      setFeaturedBets(transformedBets.slice(0, 5))
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
          title='All Bets'
          bets={allBets}
          page={BetPages.ALL}
        />
      </div>
    </DashboardLayout>
  )
}
