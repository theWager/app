export type BinaryBet = {
  id: string;
  title: string;
  votesFor: number;
  votesAgainst: number;
  image?: string;
};

export type Bet = {
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
};
export enum BetState {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  FINISHED = 'FINISHED',
  PENDING = 'PENDING',
}
