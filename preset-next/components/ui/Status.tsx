import { BetState } from '@/util/Enums'

type StatusCrumbProps = {
  state: BetState
  classes?: string
}

const StatusCrumb: React.FC<StatusCrumbProps> = ({ state, classes }) => {
  return (
    <span
      className={`${classes} ${
        state === 'ACTIVE'
          ? 'bg-wagerGreen/20 text-wagerGreen'
          : 'bg-wagerYellow/20 text-wagerYellow'
      }  text-sm px-2 py-1 rounded-lg font-medium`}
    >
      {state}
    </span>
  )
}

export default StatusCrumb
