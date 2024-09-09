'use client'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import AllBetsHeader from '@/sections/AllBets'
import { BetPages } from '@/util/Enums'
import { useEffect, useState } from 'react'
import { useWallet } from "@solana/wallet-adapter-react"
import PocketBase from 'pocketbase'
import { Bet } from '@/util/Types'
import { BetsMapper } from '@/util/ORM'
import { WalletProviderWrapper } from '@/components/WalletProviderWrapper'
import { PocketBaseBet, PocketBaseUser } from '@/util/PocketbaseTypes'

// Initialize PocketBase
const pb = new PocketBase('https://wager.pockethost.io')

function MyBetsContent() {
  const wallet = useWallet()
  const [myBets, setMyBets] = useState<Bet[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true;
    const fetchMyBets = async () => {
      if (!wallet.publicKey) {
        if (isMounted) {
          setError("Please connect your wallet")
          setIsLoading(false)
        }
        return
      }

      if (isMounted) {
        setIsLoading(true)
        setError(null)
      }

      try {
        const userAddress = wallet.publicKey.toBase58()

        const bets = await pb.collection('bets').getFullList<PocketBaseBet>({
          filter: `address_creator = "${userAddress}" || address_opponent = "${userAddress}"`,
          sort: '-created',
          requestKey: 'myBets' 
        })

        const users = await pb.collection('users').getFullList<PocketBaseUser>({
          requestKey: 'users' 
        })

        const mappedBets = BetsMapper(bets, users)

        if (isMounted) {
          setMyBets(mappedBets)
          setIsLoading(false)
        }
      } catch (err) {
        console.error('Error fetching bets:', err)
        if (isMounted && err instanceof Error) {
          setError('Failed to fetch your bets. Please try again.')
          setIsLoading(false)
        }
      }
    }

    fetchMyBets()

    return () => {
      isMounted = false;
      pb.cancelAllRequests();
    }
  }, [wallet.publicKey])

  return (
    <div className='p-4 flex flex-col gap-y-4 bg-darknavy'>
      {isLoading ? (
        <p className="text-white">Loading your bets...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <AllBetsHeader
          isLoggedIn={!!wallet.publicKey}
          title='My Bets'
          bets={myBets}
          page={BetPages.MY_BETS}
        />
      )}
    </div>
  )
}

export default function MyBets() {
  return (
    <WalletProviderWrapper>
      <DashboardLayout>
        <MyBetsContent />
      </DashboardLayout>
    </WalletProviderWrapper>
  )
}