import React, { useRef, useState, useEffect } from 'react'
import BetCard from '../components/BinaryBet'
import { BinaryBet } from '@/util/Types'
import { CATEGORIES } from '@/util/Constants'
import CategoryCard from '@/components/CategoryCard'

const CategoryGridCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setShowLeftArrow(scrollLeft > 0)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  useEffect(() => {
    checkScrollPosition()
    window.addEventListener('resize', checkScrollPosition)
    return () => window.removeEventListener('resize', checkScrollPosition)
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef
      const scrollAmount = direction === 'left' ? -1000 : 1000
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      setTimeout(checkScrollPosition, 500)
    }
  }

  return (
    <div className='relative w-full min-h-[150px] bg-wagerBlue py-6 rounded-2xl border border-wagerBlue'>
      <h1 className='text-2xl font-bold text-white px-6 z-20 relative italic'>
        Platform Specific Wagers
      </h1>
      <h3 className='text-white font-light mt-2 w-[90%] px-6 z-20 relative italic'>
        Judging is conducted by platform specific judges introduced to the community.
      </h3>
      <div
        ref={scrollRef}
        className='flex overflow-x-auto overflow-y-visible space-x-6 px-6 scrollbar-hide snap-x snap-mandatory mt-6'
        style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
        onScroll={checkScrollPosition}
      >
        {CATEGORIES.map((category, index) => (
          <CategoryCard {...category} key={index} />
        ))}
      </div>
      {showLeftArrow && (
        <>
          <div className='absolute left-0 top-0 bottom-0 w-60 bg-gradient-to-r from-[#05081D] to-transparent z-10 rounded-l-2xl'></div>
          <button
            onClick={() => scroll('left')}
            className='absolute left-2 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 w-8 h-8 font-extrabold flex items-center justify-center rounded-xl shadow-md z-20'
          >
            &lt;
          </button>
        </>
      )}
      {showRightArrow && (
        <>
          <div className='absolute right-0 top-0 bottom-0 w-60 bg-gradient-to-l from-[#05081D] to-transparent z-10 rounded-r-2xl'></div>
          <button
            onClick={() => scroll('right')}
            className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 w-8 h-8 font-extrabold flex items-center justify-center rounded-xl shadow-md z-20'
          >
            &gt;
          </button>
        </>
      )}
    </div>
  )
}

export default CategoryGridCarousel
