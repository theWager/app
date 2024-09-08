'use client'

import { PropsWithChildren, Suspense } from 'react'

import { Toaster } from 'react-hot-toast'
import Navbar from '../components/ui/Navbar'

export const HomeLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='h-full flex flex-col bg-darknavy'>
      <Navbar isHome={true} />
      <div className='flex-grow w-full'>
        <Suspense
          fallback={
            <div className='text-center my-32'>
              <span className='loading loading-spinner loading-lg'></span>
            </div>
          }
        >
          {children}
        </Suspense>
        <Toaster position='bottom-right' />
      </div>
    </div>
  )
}
