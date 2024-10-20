import { BinaryBet, Bet } from './Types'
import { BetState } from './Enums'

export const MOCK_BINARY_BETS: BinaryBet[] = [
  {
    id: '1',
    title: 'Is Trump Winning the Election?',
    votesFor: 10,
    votesAgainst: 5,
    image:
      'https://media.newyorker.com/photos/669324fd14c38da9ac7b7815/master/w_1920,c_limit/Trump-shot-AP24195851874181.jpg',
  },
  {
    id: '2',
    title: 'Will It Rain Tomorrow?',
    votesFor: 7,
    votesAgainst: 3,
    image:
      'https://media.newyorker.com/photos/669324fd14c38da9ac7b7815/master/w_1920,c_limit/Trump-shot-AP24195851874181.jpg',
  },
  {
    id: '3',
    title: 'Which Team Will Win the Super Bowl?',
    votesFor: 15,
    votesAgainst: 8,
    image:
      'https://media.newyorker.com/photos/669324fd14c38da9ac7b7815/master/w_1920,c_limit/Trump-shot-AP24195851874181.jpg',
  },
  {
    id: '4',
    title: 'Is Bitcoin Price Going to Reach $100,000?',
    votesFor: 12,
    votesAgainst: 6,
    image:
      'https://media.newyorker.com/photos/669324fd14c38da9ac7b7815/master/w_1920,c_limit/Trump-shot-AP24195851874181.jpg',
  },
  {
    id: '5',
    title: 'Will the Stock Market Crash?',
    votesFor: 9,
    votesAgainst: 4,
    image:
      'https://media.newyorker.com/photos/669324fd14c38da9ac7b7815/master/w_1920,c_limit/Trump-shot-AP24195851874181.jpg',
  },
  {
    id: '6',
    title: 'Who Will Win the World Cup?',
    votesFor: 6,
    votesAgainst: 2,
  },
  {
    id: '7',
    title: 'Is Artificial Intelligence Taking Over the World?',
    votesFor: 11,
    votesAgainst: 7,
  },
  {
    id: '8',
    title: 'Will Electric Cars Replace Gasoline Cars?',
    votesFor: 13,
    votesAgainst: 9,
  },
  {
    id: '9',
    title: 'Is Climate Change a Hoax?',
    votesFor: 8,
    votesAgainst: 3,
  },
  {
    id: '10',
    title: 'Will Humans Colonize Mars?',
    votesFor: 14,
    votesAgainst: 6,
  },
]

export const MOCK_BETS: Bet[] = [
  {
    state: BetState.ACTIVE,
    id: '1',
    title: 'Will it snow tomorrow?',
    description: 'Place your bet on whether it will snow tomorrow.',
    creatorAddress: 'JohnDoe',
    createdBy: 'JohnDoe',
    chainId: 1,
    competitor: 'AvaAnderson',
    judge: 'JaneSmith',
    ods1: 2.5,
    ods2: 1.8,
    amount: 100,
    createdDate: new Date('2022-01-01'),
    endDate: new Date('2022-01-01'),
    expirationDate: new Date('2022-01-02'),
    competitorAddress: 'a',
    acceptedCompetitor: true,
    acceptedJudge: true,
    judgeAddress: "b"
  },
  {
    state: BetState.PENDING,
    id: '2',
    title: 'Who will win the NBA finals?',
    description: 'Place your bet on which team will win the NBA finals.',
    creatorAddress: 'JohnDoe',
    createdBy: 'JohnDoe',
    chainId: 1,
    competitor: 'AvaAnderson',
    judge: 'BobSmith',
    ods1: 1.9,
    ods2: 2.2,
    amount: 200,
    createdDate: new Date('2022-02-01'),
    endDate: new Date('2022-01-01'),
    expirationDate: new Date('2022-06-01'), competitorAddress: 'a',
    acceptedCompetitor: true,
    acceptedJudge: true,
    judgeAddress: "b"
  },
  {
    state: BetState.ACTIVE,
    id: '3',
    title: 'Will the stock market go up next week?',
    description:
      'Place your bet on whether the stock market will go up next week.',
      creatorAddress: 'JohnDoe',
      createdBy: 'JohnDoe',
      chainId: 1,
      competitor: 'AvaAnderson',
    judge: 'DavidWilson',
    ods1: 1.5,
    ods2: 2.8,
    amount: 500,
    createdDate: new Date('2022-03-01'),
    endDate: new Date('2022-01-01'),
    expirationDate: new Date('2022-03-08'), competitorAddress: 'a',
    acceptedCompetitor: true,
    acceptedJudge: true,
    judgeAddress: "b"
  },
  {
    state: BetState.ACTIVE,
    id: '4',
    title: 'Will the new movie be a box office hit?',
    description:
      'Place your bet on whether the new movie will be a box office hit.',
      creatorAddress: 'JohnDoe',
      createdBy: 'JohnDoe',
      chainId: 1,
      competitor: 'AvaAnderson',
    judge: 'SarahMiller',
    ods1: 3.0,
    ods2: 1.2,
    amount: 50,
    createdDate: new Date('2022-04-01'),
    endDate: new Date('2022-01-01'),
    expirationDate: new Date('2022-04-02'), competitorAddress: 'a',
    acceptedCompetitor: true,
    acceptedJudge: true,
    judgeAddress: "b"
  },
  {
    state: BetState.ACTIVE,
    id: '5',
    title: 'Will the cryptocurrency market crash?',
    description:
      'Place your bet on whether the cryptocurrency market will crash.',
      creatorAddress: 'JohnDoe',
      createdBy: 'JohnDoe',
      chainId: 1,
      competitor: 'AvaAnderson',
    judge: 'JenniferAnderson',
    ods1: 2.0,
    ods2: 1.5,
    amount: 1000,
    createdDate: new Date('2022-05-01'),
    endDate: new Date('2022-01-01'),
    expirationDate: new Date('2022-05-08'), competitorAddress: 'a',
    acceptedCompetitor: true,
    acceptedJudge: true,
    judgeAddress: "b"
  },
  {
    state: BetState.ACTIVE,
    id: '6',
    title: 'Will the next iPhone have a foldable display?',
    description:
      'Place your bet on whether the next iPhone will have a foldable display.',
      creatorAddress: 'JohnDoe',
      createdBy: 'JohnDoe',
      chainId: 1,
      competitor: 'AvaAnderson',
    judge: 'LauraWhite',
    ods1: 1.7,
    ods2: 2.3,
    amount: 200,
    createdDate: new Date('2022-06-01'),
    endDate: new Date('2022-01-01'),
    expirationDate: new Date('2022-06-02'), competitorAddress: 'a',
    acceptedCompetitor: true,
    acceptedJudge: true,
    judgeAddress: "b"
  }
]
