import React, { useRef, useState, useEffect } from 'react';
import BetCard from '../components/BinaryBet';

interface BetGridCarouselProps {
  bets: BinaryBet[];
}

const BetGridCarousel: React.FC<BetGridCarouselProps> = ({ bets }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollPosition();
    window.addEventListener('resize', checkScrollPosition);
    return () => window.removeEventListener('resize', checkScrollPosition);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -1000 : 1000;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScrollPosition, 500);
    }
  };

  return (
    <div className="relative w-full">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-4 scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
        onScroll={checkScrollPosition}
      >
        {bets.map((bet) => (
          <BetCard key={bet.id} {...bet} />
        ))}
      </div>
      {showLeftArrow && (
        <>
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#05081D] to-transparent z-10"></div>
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 w-8 h-8 font-extrabold flex items-center justify-center rounded-xl shadow-md z-20"
          >
            &lt;
          </button>
        </>
      )}
      {showRightArrow && (
        <>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#05081D] to-transparent z-10"></div>
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 w-8 h-8 font-extrabold flex items-center justify-center rounded-xl shadow-md z-20"
          >
            &gt;
          </button>
        </>
      )}
    </div>
  );
};

export default BetGridCarousel;
