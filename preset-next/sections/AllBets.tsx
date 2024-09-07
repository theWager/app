import React from 'react';
import IconButton from '@/components/ui/Button';
import { Search, ArrowUpDown } from 'lucide-react';
import BetCard from '@/components/BetCard';
import { MOCK_BETS } from '@/util/Mocks';

interface AllBetsHeaderProps {
  isLoggedIn: boolean;
}

const AllBetsHeader: React.FC<AllBetsHeaderProps> = ({ isLoggedIn }) => {
  return (
    <div
      className={`bg-navy-900 rounded-2xl shadow-lg border border-wagerBlue p-6`}
    >
      <div className="flex items-center justify-between py-3 border-b border-wagerBlue">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <h1 className="text-xl sm:text-3xl font-bold text-teal-400">
            All Bets
          </h1>
          <IconButton
            href="#"
            classes="bg-purple-600/10 hover:bg-purple-600/20 text-purple-300 text-sm sm:text-lg inline-flex "
            disabled={!isLoggedIn}
            title="Create a Bet +"
          />
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-1 w-40 sm:w-auto rounded-md bg-gray-800 text-white text-sm border border-gray-700 focus:outline-none focus:border-purple-500"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
          </div>
          <IconButton
            classes="text-white p-2 inline-flex "
            href="#"
            title="Sort"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
        {MOCK_BETS.map((bet) => (
          <BetCard {...bet} />
        ))}
      </div>
    </div>
  );
};

export default AllBetsHeader;
