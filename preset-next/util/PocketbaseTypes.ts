export type PocketBaseBet = {
  id: string
  collectionId: string
  collectionName: string
  created: string
  updated: string
  address_creator: string
  address_opponent: string
  address_judge: string
  category: string
  expire_date: string
  end_date: string
  bet_hash: string
  description: string
  title: string
  odd_created: number
  wager_chain_id: number
  odd_opponent: number
  amount: number
  accepted_opponent: boolean
  accepted_judge: boolean
  judge_fee: number
}

export type PocketBaseUser = {
    name: string,
    address: string,
}