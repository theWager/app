'use client'

import { getWagerProgram, getWagerProgramId } from '../../blockchain/src'
import { BN, Program, web3 } from '@coral-xyz/anchor'
import { useConnection } from '@solana/wallet-adapter-react'
import { Cluster, Keypair, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useCluster } from '../cluster/cluster-data-access'
import { useAnchorProvider } from '../solana/solana-provider'
import { useTransactionToast } from '../ui/Misc'
import Pocketbase from 'pocketbase'

const pb = new Pocketbase('https://wager.pockethost.io')

interface CreateWagerArgs {
  wagerId: BN
  opponentAddress: PublicKey | null
  judgeAddress: PublicKey
  wagerAmount: BN
  expirationDate: BN
  endDate: BN
  oddsNumerator: number
  oddsDenominator: number
  wagerInitiator: PublicKey
}

interface AcceptWagerArgs {
  wagerId: BN
  wagerInitiator: PublicKey
  opponent: PublicKey
  wagerAmount: number
  odds1: number
  odds2: number
}

interface AcceptJudgingArgs {
  wagerId: BN
  wagerInitiator: PublicKey
  judge: PublicKey
}

interface CancelWagerArgs {
  wagerId: BN
  wagerInitiator: PublicKey
}

interface DeclareWinnerArgs {
  wagerId: BN
  wagerInitiator: PublicKey
  winner: PublicKey
  judge: PublicKey
}

interface RefundWagerArgs {
  wagerId: BN
  wagerInitiator: PublicKey
}

export function useCounterProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(
    () => getWagerProgramId(cluster.network as Cluster),
    [cluster],
  )
  const program = getWagerProgram(provider)

  const accounts = useQuery({
    queryKey: ['the_wager_program', 'all', { cluster }],
    queryFn: () => program.account.wager.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const createWager = useMutation<string, Error, CreateWagerArgs>({
    mutationKey: ['the_wager_program', 'createWager', { cluster }],
    mutationFn: async ({
      wagerId,
      opponentAddress,
      judgeAddress,
      wagerAmount,
      expirationDate,
      endDate,
      oddsNumerator,
      oddsDenominator,
      wagerInitiator,
    }) => {
      // Calculate the PDA for the wager account
      const [wagerPda] = PublicKey.findProgramAddressSync(
        [
          Buffer.from('wager'),
          wagerInitiator.toBuffer(),
          wagerId.toArrayLike(Buffer, 'le', 8),
        ],
        program.programId,
      )

      // Send some lamports to the opponent account from the wallet
      const transferInstruction =  web3.SystemProgram.transfer({
        fromPubkey: wagerInitiator,
        toPubkey: wagerPda,
        lamports: wagerAmount.toNumber(),
      });

      return program.methods
        .createWager(
          wagerId,
          opponentAddress,
          judgeAddress,
          wagerAmount,
          expirationDate,
          endDate,
          oddsNumerator,
          oddsDenominator,
        )
        .accounts({
          //@ts-ignore
          wager: wagerPda,
          user: wagerInitiator,
          systemProgram: web3.SystemProgram.programId,
        })
        .preInstructions([transferInstruction])
        .rpc()
    },
    onSuccess: signature => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: error => {
      console.error(error.message)
      toast.error('Failed to create wager')
    },
  })

  const acceptWager = useMutation<string, Error, AcceptWagerArgs>({
    mutationKey: ['the_wager_program', 'acceptWager', { cluster }],
    mutationFn: async ({ wagerId, wagerInitiator, opponent, wagerAmount, odds1, odds2 }) => {
      // Calculate the PDA for the wager account
      const [wagerPda] = PublicKey.findProgramAddressSync(
        [
          Buffer.from('wager'),
          wagerInitiator.toBuffer(),
          wagerId.toArrayLike(Buffer, 'le', 8),
        ],
        program.programId,
      )

      // Send some lamports to the opponent account from the wallet
      const transferInstruction =  web3.SystemProgram.transfer({
        fromPubkey: opponent,
        toPubkey: wagerPda,
        lamports: wagerAmount * odds2 * LAMPORTS_PER_SOL / odds1,
      });

      console.log(opponent.toBase58())

      return program.methods
        .acceptWager()
        .accounts({
          user: opponent,
          wager: wagerPda,
        })
        .preInstructions([transferInstruction])
        .rpc()
    },
    onSuccess: tx => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  const acceptJudging = useMutation<string, Error, AcceptJudgingArgs>({
    mutationKey: ['the_wager_program', 'acceptJudging', { cluster }],
    mutationFn: async ({ wagerId, wagerInitiator, judge }) => {
      // Calculate the PDA for the wager account
      const [wagerPda] = PublicKey.findProgramAddressSync(
        [
          Buffer.from('wager'),
          wagerInitiator.toBuffer(),
          wagerId.toArrayLike(Buffer, 'le', 8),
        ],
        program.programId,
      )

      return program.methods
        .acceptJudging()
        .accounts({
          user: judge,
          wager: wagerPda,
        })
        .rpc()
    },
    onSuccess: tx => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  const cancelWager = useMutation<string, Error, CancelWagerArgs>({
    mutationKey: ['the_wager_program', 'cancelWager', { cluster }],
    mutationFn: async ({ wagerId, wagerInitiator }) => {
      const [wagerPda] = PublicKey.findProgramAddressSync(
        [
          Buffer.from('wager'),
          wagerInitiator.toBuffer(),
          wagerId.toArrayLike(Buffer, 'le', 8),
        ],
        program.programId,
      )

      return program.methods
        .cancelWager()
        .accounts({
          user: wagerInitiator,
          wager: wagerPda,
        })
        .rpc()
    },
    onSuccess: tx => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  const declareWinner = useMutation<string, Error, DeclareWinnerArgs>({
    mutationKey: ['the_wager_program', 'cancelWager', { cluster }],
    mutationFn: async ({ wagerId, wagerInitiator, winner, judge }) => {
      const [wagerPda] = PublicKey.findProgramAddressSync(
        [
          Buffer.from('wager'),
          wagerInitiator.toBuffer(),
          wagerId.toArrayLike(Buffer, 'le', 8),
        ],
        program.programId,
      )

      return program.methods
        .declareWinner(winner)
        .accounts({
          wager: wagerPda,
          user: judge,
          winner: winner,
          //@ts-ignore
          systemProgram: web3.SystemProgram.programId,
        })
        .rpc()
    },
    onSuccess: tx => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  const refundWager = useMutation<string, Error, RefundWagerArgs>({
    mutationKey: ['the_wager_program', 'refundWager', { cluster }],
    mutationFn: async ({ wagerId, wagerInitiator }) => {
      const [wagerPda] = PublicKey.findProgramAddressSync(
        [
          Buffer.from('wager'),
          wagerInitiator.toBuffer(),
          wagerId.toArrayLike(Buffer, 'le', 8),
        ],
        program.programId,
      )

      return program.methods
        .refundWager()
        .accounts({
          user: wagerInitiator,
          wager: wagerPda,
        })
        .rpc()
    },
    onSuccess: tx => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    createWager,
    acceptWager,
    acceptJudging,
    cancelWager,
    declareWinner,
    refundWager,
  }
}

export function useCounterProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = useCounterProgram()

  const accountQuery = useQuery({
    queryKey: ['the_wager_program', 'fetch', { cluster, account }],
    queryFn: () => program.account.wager.fetch(account),
  })

  return {
    accountQuery,
  }
}
