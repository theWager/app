'use client';
import { useState } from 'react';
import CreateBetModal from '../createBetModal';
import BetGridCarousel from '@/sections/FeaturedBets';
import { AppHero } from '../ui/ui-layout';
import { MOCK_BINARY_BETS } from '@/util/Mocks';

const links: { label: string; href: string }[] = [
  { label: 'Solana Docs', href: 'https://docs.solana.com/' },
  { label: 'Solana Faucet', href: 'https://faucet.solana.com/' },
  { label: 'Solana Cookbook', href: 'https://solanacookbook.com/' },
  { label: 'Solana Stack Overflow', href: 'https://solana.stackexchange.com/' },
  {
    label: 'Solana Developers GitHub',
    href: 'https://github.com/solana-developers/',
  },
];

export default function DashboardFeature() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div>
      <BetGridCarousel bets={MOCK_BINARY_BETS} />
      <AppHero title="gm" subtitle="Say hi to your new Solana dApp." />
      <div className="max-w-xl mx-auto py-6 sm:px-6 lg:px-8 text-center">
      <button
        onClick={openModal}
        className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
      >
        Create New Bet
      </button>
      <CreateBetModal isOpen={isModalOpen} onClose={closeModal} />
        <div className="space-y-2">
          <p>Here are some helpful links to get you started.</p>
          {links.map((link, index) => (
            <div key={index}>
              <a
                href={link.href}
                className="link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
