import { BetCategory } from '@/util/Types'
import Judge from '@/assets/judge.svg'
import Image from 'next/image'

const CategoryCard: React.FC<BetCategory> = ({
  name,
  icon,
  judge,
  classes,
  judgeIcon,
}) => {
  return (
    <div
      className={
        'flex flex-row p-6 rounded-2xl min-w-[350px] max-w-[450px] h-full space-x-6 ' +
        classes
      }
    >
      <Image src={icon} alt='gavel' className='w-8 h-8' />
      <div className='flex flex-col space-y-1'>
        <h2 className='font-bold text-2xl'>{name}</h2>
        <div className='flex w-full flex items-center space-x-3'>
          <p className='text-lg font-semibold'>{judge}</p>
          <Image src={judgeIcon} alt='gavel' className='w-4 h-4' />
        </div>
      </div>
    </div>
  )
}
export default CategoryCard
