import React, { useState, useEffect} from 'react';
import { X, ChevronDown, CheckCircle, XCircle } from 'lucide-react';
import { useWallet } from "@solana/wallet-adapter-react";
import PocketBase from 'pocketbase';

// Initialize PocketBase
const pb = new PocketBase('https://wager.pockethost.io');

interface CreateBetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateBetModal: React.FC<CreateBetModalProps> = ({ isOpen, onClose }) => {
  const wallet = useWallet()

  const [formData, setFormData] = useState({
    address_opponent: '',
    address_judge: '',
    category: '',
    expire_date: '',
    end_date: '',
    description: '',
    title: '',
    odd_created: '',
    odd_opponent: '',
    amount: '',
    judge_fee: '',
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    type: 'success' as 'success' | 'error',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Generate a simple hash for the bet
      const betHash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      
const betData = {
  ...formData,
  bet_hash: betHash,
  accepted_opponent: false,
  accepted_judge: false, 
  address_creator: wallet.publicKey?.toBase58(),
};

      // Send data to PocketBase
      await pb.collection('bets').create(betData);
      
      setSnackbar({
        open: true,
        message: 'Bet created successfully!',
        type: 'success',
      });
      setTimeout(()=> {onClose();}, 2000)
       // Close the modal after successful creation
    } catch (error) {
      console.error('Error creating bet:', error);
      setSnackbar({
        open: true,
        message: 'Error creating bet. Please try again.',
        type: 'error',
      });
    }
  };

  useEffect(() => {
    if (snackbar.open) {
      const timer = setTimeout(() => {
        setSnackbar(prev => ({ ...prev, open: false }));
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [snackbar.open]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 text-white p-6 rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-teal-400">Create a bet</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-teal-400 mb-1">Bet Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Type a bet title"
              className="w-full bg-gray-800 rounded px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-teal-400 mb-1">Bet Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              placeholder="Type Bet Description"
              className="w-full bg-gray-800 rounded px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            ></textarea>
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-teal-400 mb-1">Category</label>
            <div className="relative">
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full bg-gray-800 rounded px-3 py-2 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Pick a Category</option>
                <option value="Sports">Sports</option>
                <option value="Politics">Politics</option>
                <option value="entertainment">Entertainment</option>
                {/* Add more categories as needed */}
              </select>
              <ChevronDown size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
          
          <div className="flex space-x-4">
            <div className="flex-1">
              <label htmlFor="amount" className="block text-sm font-medium text-teal-400 mb-1">Bet Amount</label>
              <div className="flex">
                <input
                  type="text"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="Enter Amount"
                  className="w-full bg-gray-800 rounded-l px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <span className="bg-gray-700 px-3 py-2 rounded-r text-gray-400">SOL</span>
              </div>
            </div>
            <div className="flex-1">
              <label htmlFor="odds" className="block text-sm font-medium text-teal-400 mb-1">Odds</label>
              <div className="flex">
                <input
                  type="text"
                  id="odd_created"
                  name="odd_created"
                  value={formData.odd_created}
                  onChange={handleInputChange}
                  placeholder="3"
                  className="w-1/2 bg-gray-800 rounded-l px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <span className="bg-gray-700 px-3 py-2 text-gray-400">:</span>
                <input
                  type="text"
                  id="odd_opponent"
                  name="odd_opponent"
                  value={formData.odd_opponent}
                  onChange={handleInputChange}
                  placeholder="1"
                  className="w-1/2 bg-gray-800 rounded-r px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="address_opponent" className="block text-sm font-medium text-teal-400 mb-1">Opponent Address</label>
            <input
              type="text"
              id="address_opponent"
              name="address_opponent"
              value={formData.address_opponent}
              onChange={handleInputChange}
              placeholder="Type Opponent Address"
              className="w-full bg-gray-800 rounded px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          
          <div>
            <label htmlFor="address_judge" className="block text-sm font-medium text-teal-400 mb-1">Judge Address</label>
            <input
              type="text"
              id="address_judge"
              name="address_judge"
              value={formData.address_judge}
              onChange={handleInputChange}
              placeholder="Type Judge Address"
              className="w-full bg-gray-800 rounded px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          
          <div>
            <label htmlFor="expire_date" className="block text-sm font-medium text-teal-400 mb-1">Expiry Date</label>
            <input
              type="date"
              id="expire_date"
              name="expire_date"
              value={formData.expire_date}
              onChange={handleInputChange}
              className="w-full bg-gray-800 rounded px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label htmlFor="end_date" className="block text-sm font-medium text-teal-400 mb-1">End Date</label>
            <input
              type="date"
              id="end_date"
              name="end_date"
              value={formData.end_date}
              onChange={handleInputChange}
              className="w-full bg-gray-800 rounded px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          
          <div className="flex space-x-4 mt-6">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600">Cancel</button>
            <button type="submit" className="flex-1 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500">Create a Bet</button>
          </div>
        </form>
      </div>
      {snackbar.open && (
        <div className={`fixed bottom-4 right-4 px-4 py-2 rounded-md shadow-lg flex items-center space-x-2 ${
          snackbar.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}>
          {snackbar.type === 'success' ? (
            <CheckCircle className="text-white" size={20} />
          ) : (
            <XCircle className="text-white" size={20} />
          )}
          <p className="text-white">{snackbar.message}</p>
        </div>
      )}
    </div>
  );
};

export default CreateBetModal;