'use client'

import { PropsWithChildren, Suspense } from 'react'

import { ClusterProvider } from '@/components/cluster/cluster-data-access'
import { ReactQueryProvider } from '@/components/react-query-provider'
import { SolanaProvider } from '@/components/solana/solana-provider'
import { Toaster } from 'react-hot-toast'
import { AccountChecker } from '../components/account/account-ui'
import { ClusterChecker } from '../components/cluster/cluster-ui'
import Navbar from '../components/ui/Navbar'

export const DashboardLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ReactQueryProvider>
      <ClusterProvider>
        <SolanaProvider>
          <div className='h-full flex flex-col bg-darknavy'>
            <Navbar />
            <ClusterChecker>
              <AccountChecker />
            </ClusterChecker>
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
        </SolanaProvider>
      </ClusterProvider>
    </ReactQueryProvider>
  )
}
