import { useAppContext } from '../context/appContext'
import StatItem from './StatItem'
import { FaRegCalendarAlt, FaRegCalendarCheck, FaRegCalendarTimes} from 'react-icons/fa'
import Wrapper from '../assets/wrappers/StatsContainer'


const StatsContainer = () => {
  const { stats } = useAppContext()



  const defaultStats = [
    {
      title: 'Projects on Working',
      count: stats.working || 0,
      icon: <FaRegCalendarAlt />,
      color: '#8bd3dd',
      bcg: '#fef6e4',
    },
    {
      title: 'Projects Finished',
      count: stats.finished || 0,
      icon: <FaRegCalendarCheck />,
      color: '#9656a1',
      bcg: '#fef6e4',
    },
    {
      title: 'Projects Cancelled',
      count: stats.cancelled || 0,
      icon: <FaRegCalendarTimes />,
      color: '#f582ae',
      bcg: '#fef6e4',
    },
  ]

  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <StatItem key={index} {...item} />
      })}

     

    </Wrapper>
  )
}

export default StatsContainer
