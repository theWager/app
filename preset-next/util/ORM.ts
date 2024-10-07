import { BetState } from './Enums'
import { PocketBaseBet, PocketBaseUser } from './PocketbaseTypes'
import { Bet } from './Types'

export const BetsMapper = (
  bets: PocketBaseBet[],
  users: PocketBaseUser[],
): Bet[] => {
  const userMap = users.reduce((map, user) => {
    map[user.address] = user.name // Assuming user.address and bet.address_creator are strings
    return map
  }, {} as Record<string, string>) // Define the map as an object with string keys and string value

  const transformedBets: Bet[] = bets.map(bet => ({
    state: bet.accepted_opponent ? BetState.ACTIVE : BetState.PENDING, // Default to active, adjust if necessary
    id: bet.id,
    title: bet.title,
    description: bet.description,
    createdBy: userMap[bet.address_creator] || 'Unknown', // Lookup the username, fallback to 'Unknown' if not found,
    creatorAddress: bet.address_creator,
    judge: userMap[bet.address_judge] || 'No Judge',
    competitor: userMap[bet.address_opponent] || 'Opponent pending',
    competitorAddress: bet.address_opponent,
    acceptedCompetitor: bet.accepted_opponent,
    judgeAddress: bet.address_judge,
    chainId: bet.wager_chain_id,
    acceptedJudge: bet.accepted_judge,
    ods1: bet.odd_created,
    ods2: bet.odd_opponent,
    amount: bet.amount,
    createdDate: new Date(bet.created),
    expirationDate: new Date(bet.expire_date),
  }))

  return transformedBets
}
