import React from 'react'
import { BetState } from './Enums'

export type BinaryBet = {
  id: string
  title: string
  votesFor: number
  votesAgainst: number
  image?: string
}

export type Bet = {
  state: BetState
  id: string
  title: string
  description: string
  createdBy: string
  creatorAddress: string
  competitor: string
  competitorAddress: string
  acceptedCompetitor: boolean
  judgeAddress: string
  acceptedJudge: boolean
  endDate: Date
  judge: string
  chainId: number
  ods1: number
  ods2: number
  amount: number
  createdDate: Date
  expirationDate: Date
}

export type BetCategory = {
  icon: any
  name: string
  judge: string
  classes: string
  judgeIcon: any
}
