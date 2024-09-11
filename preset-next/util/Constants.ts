import { BetCategory } from './Types'
import DiscordDark from '@/assets/discordDark.svg'
import PokerStars from '@/assets/pokerstars.svg'
import Quiz from '@/assets/quizDark.svg'
import Judge from '@/assets/judgeWhite.svg'
import JudgeDark from '@/assets/judgeDark.svg'
import Money from '@/assets/money.svg'
import MoneyDark from '@/assets/moneyDark.svg'

export const NAVBAR_LINKS: { label: string; path: string }[] = [
  { label: 'How it works', path: '/' },
]

export const CATEGORIES: BetCategory[] = [
  {
    name: 'Discord',
    icon: DiscordDark,
    judge: 'Donald Trump',
    classes: 'bg-amber-300 text-black ',
    judgeIcon: JudgeDark,
  },
  {
    name: 'Pokerstars',
    icon: PokerStars,
    judge: 'Michael Jordan',
    classes: 'bg-pink-600	text-white',
    judgeIcon: Judge,
  },
  {
    name: 'Quizes',
    icon: Quiz,
    judge: 'Tom Hanks',
    classes: 'bg-violet-400 text-black ',
    judgeIcon: JudgeDark,
  },
  {
    name: 'Crypto',
    icon: MoneyDark,
    judge: 'Satoshi Nakamoto',
    classes: 'bg-wagerGreen text-black ',
    judgeIcon: JudgeDark,
  },
  {
    name: 'Politics',
    icon: Money,
    judge: 'Satoshi Nakamoto',
    classes: 'bg-orange-700	text-white ',
    judgeIcon: Judge,
  },
  {
    name: 'Celebrities',
    icon: Money,
    judge: 'Satoshi Nakamoto',
    classes: 'bg-fuchsia-700	text-white ',
    judgeIcon: Judge,
  },
]
