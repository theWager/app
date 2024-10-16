'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import Discord from '../../assets/discord.svg'
import Logo from '../../assets/wager.svg'
import Telegram from '../../assets/telegram.svg'
import { NAVBAR_LINKS } from '../../util/Constants'
import { ClusterUiSelect } from '../cluster/cluster-ui'
import { WalletButton } from '../solana/solana-provider'
import IconButton from './Button'
import PixelGrid from '../../public/pixel-grid.png'
import Marquee from 'react-fast-marquee'
import { DotGothic16 } from 'next/font/google'
import { useWallet } from '@solana/wallet-adapter-react'
import HowItWorksModal from '../HowItWorksModal'

const dg16 = DotGothic16({ subsets: ['latin'], weight: ['400'] })
type NavbarProps = {
  isHome?: boolean
}

const Navbar: React.FC<NavbarProps> = ({ isHome = false }) => {
  const pathname = usePathname()
  const wallet = useWallet()
  const [isHIWModalOpen, setIsHIWModalOpen] = useState(false)
  return (
    <nav
      className={`z-10 flex items-center justify-between bg-transparent px-4 ${isHome ? 'py-6' : 'py-3'
        }`}
    >
      <div className='flex items-center space-x-4'>
        <Link
          href='/'
          className='text-2xl font-bold text-teal-400 min-w-[60px] md:min-w-[130px]'
        >
          <Image src={Logo} height={32} width={130} alt='the wager logo' />
        </Link>
        <IconButton
          icon={Discord}
          title='Discord'
          href='#'
          classes='hidden md:inline-flex '
        />
      </div>
      {!isHome && (
        <div
          className='flex-grow h-full relative rounded-lg overflow-hidden mx-6 lg:mx-12  hidden lg:flex'
          style={{ backgroundImage: `url(${PixelGrid.src})` }}
        >
          <Marquee
            autoFill
            speed={100}
            className='top-1/2'
            style={{ position: 'absolute', transform: 'translateY(-50%)' }}
          >
            <span className={'ml-6 text-white text-xl' + dg16.className}>
              Value Locked:
              <span
                className={'ml-6 text-wagerGreen text-xl ' + dg16.className}
              >
                1358.01 SOL
              </span>
            </span>
            <span className={'ml-6 text-wagerGreen text-xl ' + dg16.className}>
              Paid Out:
              <span className={'ml-6 text-red-500 text-xl ' + dg16.className}>
                1358.01 SOL
              </span>
            </span>
            <span className={'ml-6 text-white text-xl ' + dg16.className}>
              Wagers:
              <span
                className={'ml-6 text-wagerGreen text-xl ' + dg16.className}
              >
                7542
              </span>
            </span>
          </Marquee>
        </div>
      )}
      <div className='flex items-center space-x-6'>
        {wallet.connected &&
          NAVBAR_LINKS.map(({ label, path }) => (
            <Link
              key={path}
              href={path}
              className={`text-white  transition-all duration-300 hover:text-teal-400 hidden md:inline ${pathname.startsWith(path) ? 'text-teal-400' : ''
                }`}
            >
              {label}
            </Link>
          ))}
        {/* <Bell
          className="text-white  transition-all duration-300 hover:text-teal-400 cursor-pointer"
          size={20}
        /> */}
        <WalletButton />
        <ClusterUiSelect />
        <div
          onClick={() => {
            setIsHIWModalOpen(true)
          }}
          className={`
              hidden md:inline-flex
              items-center justify-center
              w-8 h-8
              font-bold text-lg
              text-white
              transition-all duration-300
              hover:text-teal-400
              hover: cursor-pointer
              rounded-full
              bg-white/10
              hover:bg-white/20
            `}
        >
          ?
        </div>{' '}
      </div>
      <HowItWorksModal isOpen={isHIWModalOpen} onClose={() => setIsHIWModalOpen(false)} />
    </nav>
  )
}

export default Navbar
