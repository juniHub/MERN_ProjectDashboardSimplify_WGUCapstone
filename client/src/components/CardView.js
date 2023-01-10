import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/StatsContainer'
import MonthlyProjects from './MonthlyProjects'

const CardViewComponent = () => {

  const { monthlyProjects } = useAppContext()
 
  return (
    <Wrapper>

      {monthlyProjects.map((item, index) => {
        return <MonthlyProjects key={index} {...item} />
      })}

    </Wrapper>
  )
}

export default CardViewComponent
