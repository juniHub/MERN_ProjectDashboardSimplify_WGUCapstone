import Wrapper from '../assets/wrappers/StatItem'

const MonthlyProjects = ({ count, date }) => {
    
  return (
    <Wrapper>

      <header>
        <span className='count'>{count}</span>
    
      </header>
      <h5 className='title'>{date}</h5>
 

    </Wrapper>
  )
}

export default MonthlyProjects
