import React from 'react'
import { Bet } from '@/util/Types'
import { BetState } from '@/util/Enums'
import { X } from 'lucide-react'

interface BetDetailsModalProps {
  bet: Bet | null
  isOpen: boolean
  onClose: () => void
}

const BetDetailsModal: React.FC<BetDetailsModalProps> = ({
  bet,
  isOpen,
  onClose,
}) => {
  if (!bet || !isOpen) return null

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
      <div className='bg-gray-900 text-white p-6 rounded-lg max-w-md w-full'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-bold text-teal-400'>{bet.title}</h2>
          <button
            onClick={onClose}
            className='text-gray-400 transition-all duration-300 hover:text-white bg-transparent p-1'
          >
            <X size={24} />
          </button>
        </div>
        <div className='space-y-4'>
          <div>
            <p className='text-sm font-medium text-teal-400'>Created by:</p>
            <p className='text-white'>{bet.createdBy}</p>
          </div>
          <div>
            <p className='text-sm font-medium text-teal-400'>Description:</p>
            <p className='text-white'>{bet.description}</p>
          </div>
          <div className='flex space-x-4'>
            <div className='flex-1'>
              <p className='text-sm font-medium text-teal-400'>Odds 1:</p>
              <p className='text-white'>{bet.ods1}</p>
            </div>
            <div className='flex-1'>
              <p className='text-sm font-medium text-teal-400'>Odds 2:</p>
              <p className='text-white'>{bet.ods2}</p>
            </div>
          </div>
          <div className='flex space-x-4'>
            <div className='flex-1'>
              <p className='text-sm font-medium text-teal-400'>Amount:</p>
              <p className='text-white'>{bet.amount} SOL</p>
            </div>
            <div className='flex-1'>
              <p className='text-sm font-medium text-teal-400'>State:</p>
              <p className='text-white'>{BetState[bet.state]}</p>
            </div>
          </div>
          <div className='flex space-x-4'>
            <div className='flex-1'>
              <p className='text-sm font-medium text-teal-400'>Created:</p>
              <p className='text-white'>
                {bet.createdDate.toLocaleDateString()}
              </p>
            </div>
            <div className='flex-1'>
              <p className='text-sm font-medium text-teal-400'>Expires:</p>
              <p className='text-white'>
                {bet.expirationDate.toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className='flex space-x-4'>
            <div className='flex-1'>
              <p className='text-sm font-medium text-teal-400'>Opponent:</p>
              <p className='text-white'>{bet.competitor}</p>
            </div>
            <div className='flex-1'>
              <p className='text-sm font-medium text-teal-400'>Judge:</p>
              <p className='text-white'>{bet.judge}</p>
            </div>
          </div>
        </div>
        <div className='mt-6'>
          <button
            onClick={onClose}
            className='w-full px-4 py-2 bg-purple-600 text-white rounded transition-all duration-300 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500'
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default BetDetailsModal
