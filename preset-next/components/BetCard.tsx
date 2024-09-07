import { Bet } from '@/util/Types';
import React from 'react';

const BetCard: React.FC<Bet> = ({ title, state, createdBy, amount }) => {
  return (
    <div className="bg-wagerBlue/20 rounded-xl p-4 min-w-[250px] max-w-[450px]">
      <div className="flex justify-between items-center mb">
        <span className="text-teal-400 font-bold">{amount} SOL</span>
        <span
          className={` ${
            state === 'ACTIVE'
              ? 'bg-wagerGreen/30 text-wagerGreen '
              : 'bg-wagerYellow/30 text-wagerYellow '
          }  text-xs font-normal px-2 py-1 rounded`}
        >
          {state}
        </span>
      </div>
      <h2 className="text-white text-xl font-bold mb">{title}</h2>
      <div className="space-y-1">
        <div className="flex items-center">
          <span className="text-gray-400 mr-2 font-light">{createdBy}</span>
          <div className="w-4 h-4 rounded-full border-2 border-teal-400"></div>
        </div>
        <div className="text-gray-400 font-light	">elko1950</div>
      </div>
    </div>
  );
};

export default BetCard;
