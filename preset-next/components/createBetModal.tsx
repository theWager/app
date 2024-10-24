import React, { useState, useEffect } from 'react'
import { X, ChevronDown, CheckCircle, XCircle } from 'lucide-react'
import { useWallet } from '@solana/wallet-adapter-react'
import PocketBase from 'pocketbase'
import { set } from '@coral-xyz/anchor/dist/cjs/utils/features'
import { useCounterProgram } from './counter/counter-data-access'
import { BN } from '@coral-xyz/anchor'
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'

// Initialize PocketBase
const pb = new PocketBase('https://wager.pockethost.io')

interface CreateBetModalProps {
  isOpen: boolean
  onClose: () => void
}

interface User {
  address: string
  name: string
}

const CreateBetModal: React.FC<CreateBetModalProps> = ({ isOpen, onClose }) => {
  const wallet = useWallet()
  const { createWager } = useCounterProgram()

  const initialFormData = {
    opponent: '',
    judge: '',
    category: '',
    expire_date: '',
    end_date: '',
    description: '',
    title: '',
    odd_created: '',
    odd_opponent: '',
    amount: '',
    judge_fee: '',
  }

  const [formData, setFormData] = useState(initialFormData)

  const [username, setUsername] = useState('')
  const [showUsernameField, setShowUsernameField] = useState(false)
  const [belowUsernameText, setBelowUsernameText] = useState('')
  const [isOpenToAnyone, setIsOpenToAnyone] = useState(false)
  const [solanaPrice, setSolanaPrice] = useState<number | null>(null)
  const [isCreatingWager, setIsCreatingWager] = useState(false)
  const [users, setUsers] = useState<User[]>([])
  const [userMap, setUserMap] = useState<Record<string, string>>({})
  const [filteredOpponents, setFilteredOpponents] = useState<User[]>([])
  const [filteredJudges, setFilteredJudges] = useState<User[]>([])
  const [showOpponentDropdown, setShowOpponentDropdown] = useState(false)
  const [showJudgeDropdown, setShowJudgeDropdown] = useState(false)

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    type: 'success' as 'success' | 'error',
  })

  useEffect(() => {

    const fetchUsers = async () => {
      try {
        const records = await pb.collection('users').getFullList<User>()
        setUsers(records)
        const map = records.reduce((map, user) => {
          map[user.name] = user.address
          return map
        }, {} as Record<string, string>)
        setUserMap(map)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }

    fetchUsers()
  }, [])

  useEffect(() => {
    const checkUser = async () => {
      if (wallet.publicKey) {
        try {
          const result = await pb
            .collection('users')
            .getFirstListItem(`address="${wallet.publicKey.toBase58()}"`)
          setUsername(result.name)
          setShowUsernameField(false)
        } catch (error) {
          setShowUsernameField(true)
        }
      }
    }

    checkUser()
  }, [wallet.publicKey])

  const filterUsers = (input: string) => {
    return users.filter(user => 
      user.name.toLowerCase().includes(input.toLowerCase()) ||
      user.address.toLowerCase().includes(input.toLowerCase())
    )
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setIsOpenToAnyone(checked)
      if (checked) {
        setFormData(prevState => ({
          ...prevState,
          opponent: '',
        }))
      }
    } else if (type === 'radio') {
      const description = `${username || wallet.publicKey?.toBase58()} voted ${value}`
      setFormData(prevState => ({
        ...prevState,
        description: description
      }))
    } else if (type === 'datetime-local') {
      const formattedDate = new Date(value).toISOString().slice(0, 16)
      setFormData(prevState => ({
        ...prevState,
        [name]: formattedDate,
      }))
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }))
  
      if (name === 'opponent') {
        setFilteredOpponents(filterUsers(value))
        setShowOpponentDropdown(true)
      } else if (name === 'judge') {
        setFilteredJudges(filterUsers(value))
        setShowJudgeDropdown(true)
      }
    }
  }

  const handleUsernameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
    try {
      const result = await pb
        .collection('users')
        .getFirstListItem(`name="${e.target.value}"`)
      setBelowUsernameText('Username already exists')
    } catch (error) {
      setBelowUsernameText('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    setIsCreatingWager(true)
    e.preventDefault()
    try {

      if (formData.opponent === wallet.publicKey?.toBase58()) {
        setSnackbar({
          open: true,
          message: "You can't wager yourself!",
          type: 'error',
        })
        setIsCreatingWager(false)
        return
      }

      if (showUsernameField && username) {
        await pb.collection('users').create({
          name: username,
          address: wallet.publicKey?.toBase58(),
        })
      }

      const betHash =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)

      
      let wagerId
      let wagerIdBN
      try {
        const records = await pb.collection('bets').getFullList()
        wagerId = 123456 + records.length
        wagerIdBN = new BN(wagerId)
      } catch (error) {
        wagerId = Math.random()*10000
        wagerIdBN = new BN(wagerId)
      }

      const opponentAddress = userMap[formData.opponent] || formData.opponent
      const judgeAddress = userMap[formData.judge] || formData.judge

      const betData = {
        ...formData,
        bet_hash: betHash,
        accepted_opponent: false,
        accepted_judge: false,
        end_date: new Date(formData.end_date.toString().replace(' ', 'T')),
        expire_date: new Date(formData.expire_date.toString().replace(' ', 'T')),
        address_creator: wallet.publicKey?.toBase58(),
        wager_chain_id: wagerId,
        address_opponent: opponentAddress,
        address_judge: judgeAddress //"7PoGvrdKgtLqQonR15usfrW54QquXXKXSsyJ944heMoE",
      }

      // Create a create-wager transaction here
      await createWager.mutateAsync({
        wagerId: wagerIdBN, 
        opponentAddress: isOpenToAnyone ? null : new PublicKey(formData.opponent), 
        judgeAddress: new PublicKey(judgeAddress), //"7PoGvrdKgtLqQonR15usfrW54QquXXKXSsyJ944heMoE",
        wagerAmount: new BN(parseFloat(betData.amount) * LAMPORTS_PER_SOL), 
        expirationDate: new BN(betData.expire_date.getTime()), 
        endDate: new BN(betData.end_date.getTime()), 
        oddsNumerator: parseInt(formData.odd_created), 
        oddsDenominator: parseInt(formData.odd_opponent), 
        wagerInitiator: new PublicKey(wallet.publicKey as PublicKey)
      })

      await pb.collection('bets').create(betData)

      setFormData(initialFormData)

      setSnackbar({
        open: true,
        message: 'Wager created successfully!',
        type: 'success',
      })
      setTimeout(() => {
        onClose()
      }, 3000)
    } catch (error) {
      console.error('Error creating wager:', error)
      setSnackbar({
        open: true,
        message: 'Error creating wager. Please try again.',
        type: 'error',
      })
    }
    setIsCreatingWager(false)
  }

  const renderUserDropdown = (type: 'opponent' | 'judge', users: User[]) => {
    return (
      <div className="absolute z-50 w-full mt-1 bg-gray-800 rounded-md shadow-lg">
        <ul className="py-1 max-h-60 overflow-auto">
          {users.map(user => (
            <li
              key={user.address}
              onClick={() => handleUserSelect(type, user)}
              className="px-3 py-2 hover:bg-gray-700 cursor-pointer text-white"
            >
              {user.name} ({user.address.slice(0, 4)}...{user.address.slice(-4)})
            </li>
          ))}
        </ul>
      </div>
    )
  }

  const handleUserSelect = (type: 'opponent' | 'judge', user: User) => {
    setFormData(prevState => ({
      ...prevState,
      [type]: user.name,
    }))
    if (type === 'opponent') {
      setShowOpponentDropdown(false)
    } else {
      setShowJudgeDropdown(false)
    }
  }

  useEffect(() => {
    if (snackbar.open) {
      const timer = setTimeout(() => {
        setSnackbar(prev => ({ ...prev, open: false }))
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [snackbar.open])

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-scroll'>
      <div className='bg-gray-900 text-white p-6 rounded-lg max-w-md w-full absolute top-0'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-bold text-teal-400'>Create Wager</h2>
          <button
            onClick={onClose}
            className='text-gray-400 transition-all duration-300 hover:text-white'
          >
            <X size={24} />
          </button>
        </div>


        <form className='space-y-4' onSubmit={handleSubmit}>
          {showUsernameField && (
            <div>
              <label
                htmlFor='username'
                className='block text-sm font-medium text-teal-400 mb-1'
              >
                Username
              </label>
              <input
                type='text'
                id='username'
                name='username'
                value={username}
                onChange={handleUsernameChange}
                placeholder='Username must be set for participating'
                className='w-full bg-gray-800 rounded px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500'
                required
              />
              <label className='text-sm text-red-500'>{belowUsernameText}</label>
            </div>
          )}
          <div>
            <label
              htmlFor='title'
              className='block text-sm font-medium text-teal-400 mb-1'
            >
              Wager Title
            </label>
            <input
              type='text'
              id='title'
              name='title'
              value={formData.title}
              onChange={handleInputChange}
              placeholder='e.g. Will Trump win the U.S. elections?'
              className='w-full bg-gray-800 rounded px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500'
            />
          </div>

          <div>
  <label className='block text-sm font-medium text-teal-400 mb-3'>
    Your Vote
  </label>
  <div className='flex space-x-6'>
    <div className='flex items-center'>
      <input
        type='radio'
        id='vote-yes'
        name='vote'
        value='yes'
        checked={formData.description.includes('voted yes')}
        onChange={handleInputChange}
        className='form-radio h-5 w-5 text-teal-400 bg-gray-800 border-gray-600 focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50 cursor-pointer'
      />
      <label
        htmlFor='vote-yes'
        className='ml-2 text-sm font-medium text-white cursor-pointer'
      >
        Yes
      </label>
    </div>
    <div className='flex items-center'>
      <input
        type='radio'
        id='vote-no'
        name='vote'
        value='no'
        checked={formData.description.includes('voted no')}
        onChange={handleInputChange}
        className='form-radio h-5 w-5 text-teal-400 bg-gray-800 border-gray-600 focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50 cursor-pointer'
      />
      <label
        htmlFor='vote-no'
        className='ml-2 text-sm font-medium text-white cursor-pointer'
      >
        No
      </label>
    </div>
  </div>
  {formData.description && (
    <p className='mt-2 text-sm text-gray-400'>
      {formData.description}
    </p>
  )}
</div>

          <div>
            <label
              htmlFor='category'
              className='block text-sm font-medium text-teal-400 mb-1'
            >
              Category
            </label>
            <div className='relative'>
              <select
                id='category'
                name='category'
                value={formData.category}
                onChange={handleInputChange}
                className='w-full bg-gray-800 rounded px-3 py-2 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500'
              >
                <option value=''>Pick a Category</option>
                <option value="Friend Wager">Friend Wager</option>
                <option value="Pop culture">Pop culture</option>
                <option value='Sports'>Sports</option>
                <option value='Politics'>Politics</option>
                <option value='Entertainment'>Entertainment</option>
                <option value='Business'>Business</option>
                <option value='Science'>Science</option>
                <option value='Stream'>Stream</option>
                <option value='Games'>Games</option>
              </select>
              <ChevronDown
                size={20}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none'
              />
            </div>
          </div>

          <div className='flex space-x-4'>
            <div className='flex-1'>
              <label
                htmlFor='amount'
                className='block text-sm font-medium text-teal-400 mb-1'
              >
                Amount to wager
              </label>
              <div className='flex'>
                <input
                  type='text'
                  id='amount'
                  name='amount'
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder='Enter Amount'
                  className='w-full bg-gray-800 rounded-l px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500'
                />
                <span className='bg-gray-700 px-3 py-2 rounded-r text-gray-400'>
                  SOL
                </span>
              </div>
              {solanaPrice && (
                <span className='text-xs text-gray-400 mt-1'>
                  1 SOL = ${solanaPrice.toFixed(2)} USD
                </span>
              )}
            </div>
            <div className='flex-1'>
              <label
                htmlFor='odds'
                className='block text-sm font-medium text-teal-400 mb-1'
              >
                Odds
              </label>
              <div className='flex'>
                <input
                  type='text'
                  id='odd_created'
                  name='odd_created'
                  value={formData.odd_created}
                  onChange={handleInputChange}
                  placeholder='3'
                  className='w-1/2 bg-gray-800 rounded-l px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500'
                />
                <span className='bg-gray-700 px-3 py-2 text-gray-400'>:</span>
                <input
                  type='text'
                  id='odd_opponent'
                  name='odd_opponent'
                  value={formData.odd_opponent}
                  onChange={handleInputChange}
                  placeholder='1'
                  className='w-1/2 bg-gray-800 rounded-r px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500'
                />
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="openToAnyone"
              name="openToAnyone"
              checked={isOpenToAnyone}
              onChange={handleInputChange}
              className="form-checkbox h-5 w-5 text-teal-400 bg-gray-800 border-gray-600 rounded focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50 checked:bg-teal-400 checked:border-transparent cursor-pointer"
            />
            <label htmlFor="openToAnyone" className="ml-2 text-sm font-medium text-teal-400 cursor-pointer">
              Bet open to anyone
            </label>
          </div>

          {!isOpenToAnyone && (
    <div className="relative">
      <label
        htmlFor='opponent'
        className='block text-sm font-medium text-teal-400 mb-1'
      >
        Opponent
      </label>
      <div className="relative">
        <input
          type="text"
          id='opponent'
          name='opponent'
          value={formData.opponent}
          onChange={handleInputChange}
          onFocus={() => setShowOpponentDropdown(true)}
          onBlur={() => setTimeout(() => setShowOpponentDropdown(false), 200)}
          placeholder='Enter username or address'
          className='w-full bg-gray-800 rounded px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500'
        />
        <ChevronDown 
          size={20}
          className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none'
        />
      </div>
      {showOpponentDropdown && filteredOpponents.length > 0 && (
        renderUserDropdown('opponent', filteredOpponents)
      )}
    </div>
  )}

  <div className="relative">
    <label
      htmlFor='judge'
      className='block text-sm font-medium text-teal-400 mb-1'
    >
      Judge
    </label>
    <div className="relative">
      <input
        type="text"
        id='judge'
        name='judge'
        value={formData.judge}
        onChange={handleInputChange}
        onFocus={() => setShowJudgeDropdown(true)}
        onBlur={() => setTimeout(() => setShowJudgeDropdown(false), 200)}
        placeholder='Enter username or address'
        className='w-full bg-gray-800 rounded px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500'
      />
      <ChevronDown 
        size={20}
        className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none'
      />
    </div>
    {showJudgeDropdown && filteredJudges.length > 0 && (
      renderUserDropdown('judge', filteredJudges)
    )}
  </div>


          <div>
            <label
              htmlFor='expire_date'
              className='block text-sm font-medium text-teal-400 mb-1'
            >
              Expiry Date and Time
            </label>
            <input
              type='datetime-local'
              id='expire_date'
              name='expire_date'
              value={formData.expire_date}
              onChange={handleInputChange}
              className='w-full bg-gray-800 rounded px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500'
            />
          </div>
          <div>
            <label
              htmlFor='end_date'
              className='block text-sm font-medium text-teal-400 mb-1'
            >
              End Date and Time
            </label>
            <input
              type='datetime-local'
              id='end_date'
              name='end_date'
              value={formData.end_date}
              onChange={handleInputChange}
              className='w-full bg-gray-800 rounded px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500'
            />
          </div>

          <div className='flex space-x-4 mt-6'>
            <button
              type='button'
              onClick={onClose}
              className='flex-1 px-4 py-2 bg-gray-800 text-white rounded transition-all duration-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600'
            >
              Cancel
            </button>
            <button
  type='submit'
  disabled={isCreatingWager || !formData.description}
  className='flex-1 px-4 py-2 bg-purple-600 text-white rounded transition-all duration-300 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50'
>
  {isCreatingWager ? 'Creating Wager...' : 'Create Wager'}
</button>
          </div>
        </form>

        {snackbar.open && (
          <div
            className={`fixed bottom-4 right-4 px-4 py-2 rounded-md shadow-lg flex items-center space-x-2 ${
              snackbar.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {snackbar.type === 'success' ? (
              <CheckCircle className='text-white' size={20} />
            ) : (
              <XCircle className='text-white' size={20} />
            )}
            <p className='text-white'>{snackbar.message}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CreateBetModal