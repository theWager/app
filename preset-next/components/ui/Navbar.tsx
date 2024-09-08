'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import Discord from '../../assets/discord.svg'
import Logo from '../../assets/wager.svg'
import Telegram from '../../assets/telegram.svg'
import { NAVBAR_LINKS } from '../../util/Constants'
import { ClusterUiSelect } from '../cluster/cluster-ui'
import { WalletButton } from '../solana/solana-provider'
import IconButton from './Button'

type NavbarProps = {
  isHome?: boolean
}

const Navbar: React.FC<NavbarProps> = ({ isHome = false }) => {
  const pathname = usePathname()

  return (
    <nav
      className={`z-10 flex items-center justify-between bg-transparent px-16 ${
        isHome ? 'py-6' : 'py-3'
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
        <IconButton
          icon={Telegram}
          title='Telegram'
          href='#'
          classes='hidden md:inline-flex '
        />
      </div>

      {!isHome && (
        <div className='flex items-center space-x-4'>
          {NAVBAR_LINKS.map(({ label, path }) => (
            <Link
              key={path}
              href={path}
              className={`text-white hover:text-teal-400 hidden md:inline ${
                pathname.startsWith(path) ? 'text-teal-400' : ''
              }`}
            >
              {label}
            </Link>
          ))}
          {/* <Bell
          className="text-white hover:text-teal-400 cursor-pointer"
          size={20}
        /> */}
          <WalletButton />
          <ClusterUiSelect />
        </div>
      )}
    </nav>
  )
}

export default Navbar
