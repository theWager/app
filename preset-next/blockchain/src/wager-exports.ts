// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { Cluster, PublicKey } from '@solana/web3.js';
import WagerIDL from '../target/idl/the_wager_program.json';
import type { TheWagerProgram } from '../target/types/the_wager_program';

// Re-export the generated IDL and type
export { TheWagerProgram, WagerIDL };

// The programId is imported from the program IDL.
export const WAGER_PROGRAM_ID = new PublicKey(WagerIDL.address);

// This is a helper function to get the Counter Anchor program.
export function getWagerProgram(provider: AnchorProvider) {
  return new Program(WagerIDL as TheWagerProgram, provider);
}

// This is a helper function to get the program ID for the Counter program depending on the cluster.
export function getWagerProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Counter program on devnet and testnet.
      return new PublicKey('YhH2w4tJgpyGvv7gADLtsqoRezNWhpb7zLzudWAr775');
    case 'mainnet-beta':
    default:
      return WAGER_PROGRAM_ID;
  }
}
