import React from 'react';
import Image from 'next/image';

const BetCard: React.FC<BinaryBet> = ({
  id,
  title,
  votesFor,
  votesAgainst,
  image,
}) => {
  return (
    <div
      className={`bg-navy-900 rounded-2xl shadow-lg border border-wagerBlue p-6 ${
        image ? 'min-w-[400px]' : 'min-w-[200px]'
      }`}
      key={id}
    >
      {image && (
        <div className="w-full h-16 relative rounded-md overflow-hidden">
          <Image src={image} alt={title} layout="fill" objectFit="cover" />
        </div>
      )}
      <div
        className={`flex ${
          image ? 'pt-4 flex-row gap-x-4' : 'flex-col h-full justify-between'
        }`}
      >
        <div className={`flex flex-col ${image ? 'basis-2/3' : ''}`}>
          <h2 className="stext-white text-xl font-bold mb-2">{title}</h2>
          <p className="text-gray-400 mb-4 font-light">{votesFor} voted Yes</p>
        </div>
        <div
          className={`flex w-full ${
            image ? ' basis-1/3 gap-y-2 flex-col' : ' gap-x-2 flex-row h-fit'
          }`}
        >
          <button className="bg-green-600/50 hover:bg-green-700 text-green-300 font-medium rounded w-full h-fit	">
            Bet Yes
          </button>
          <button className="bg-red-600/50 hover:bg-red-700 text-red-300 font-medium rounded w-full h-fit">
            Bet No
          </button>
        </div>
      </div>
    </div>
  );
};

export default BetCard;
