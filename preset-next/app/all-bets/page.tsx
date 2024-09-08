'use client'
import React, { useState, useEffect } from 'react';
import BetGridCarousel from '@/sections/FeaturedBets'
import AllBetsHeader from '@/sections/AllBets'
import { MOCK_BINARY_BETS } from '@/util/Mocks'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { BetPages } from '@/util/Enums'
import PocketBase from 'pocketbase';
import { BetState } from '@/util/Enums';

const pb = new PocketBase('https://wager.pockethost.io');

interface PocketBaseBet {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  address_creator: string;
  address_opponent: string;
  address_judge: string;
  category: string;
  expire_date: string;
  end_date: string;
  bet_hash: string;
  description: string;
  title: string;
  odd_created: number;
  odd_opponent: number;
  amount: number;
  accepted_opponent: boolean;
  accepted_judge: boolean;
  judge_fee: number;
}

interface Bet {
  state: BetState;
  id: string;
  title: string;
  description: string;
  createdBy: string;
  judge: string;
  ods1: number;
  ods2: number;
  amount: number;
  createdDate: Date;
  expirationDate: Date;
}

export default function Dashboard() {
  const [allBets, setAllBets] = useState<Bet[]>([]);
  const [featuredBets, setFeaturedBets] = useState<Bet[]>([]);

  const fetchBets = async () => {
    try {
      // Fetch all bets
      const storedBets = await pb.collection('bets').getFullList<PocketBaseBet>({
        sort: '-created',
      });
  
      // Fetch all users
      const storedUsers = await pb.collection('users').getFullList<PocketBaseUser>({
        sort: '-created',
      });
  
      // Create a mapping of user addresses to usernames
      const userMap = storedUsers.reduce((map, user) => {
        map[user.address] = user.name; // Assuming user.address and bet.address_creator are strings
        return map;
      }, {} as Record<string, string>); // Define the map as an object with string keys and string values
  
      // Transform the bets
      const transformedBets: Bet[] = storedBets.map((bet) => ({
        state: bet.accepted_opponent ? BetState.ACTIVE : BetState.PENDING, // Default to active, adjust if necessary
        id: bet.id,
        title: bet.title,
        description: bet.description,
        createdBy: userMap[bet.address_creator] || 'Unknown', // Lookup the username, fallback to 'Unknown' if not found
        judge: userMap[bet.address_judge]|| 'No Judge',
        competitor: userMap[bet.address_opponent] || 'Opponent pending',
        ods1: bet.odd_created,
        ods2: bet.odd_opponent,
        amount: bet.amount,
        createdDate: new Date(bet.created),
        expirationDate: new Date(bet.expire_date),
      }));
  
      // Set the transformed bets to the state
      setAllBets(transformedBets);
  
      // For featured bets, take the first 5 bets
      setFeaturedBets(transformedBets.slice(0, 5));
    } catch (error) {
      console.error('Error fetching bets:', error);
    }
  };

  
  useEffect(() => {
    fetchBets();
  }, []);

  return (
    <DashboardLayout>
      <div className='p-4 flex flex-col gap-y-4 bg-darknavy'>
        <BetGridCarousel bets={MOCK_BINARY_BETS} />
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
