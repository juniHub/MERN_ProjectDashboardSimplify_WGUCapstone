import moment from "moment"
import Wrapper from '../assets/wrappers/ListWrapper'
import ListRow from './ListRow'

const List = ({
 
  title,
  leader,
  note,
  deadline,
  updatedAt,
  status,
}) => {
  
  let updatedDate = moment(updatedAt)
  updatedDate = updatedDate.format('MMM Do, YYYY')

  let deadlineDate = moment(deadline)
  deadlineDate = deadlineDate.format('ddd, MMM Do YYYY, h:mm:ss a')



  return (
   <Wrapper>
    <div className='list'>
       <div className='list-center'>
       
        
        <ListRow  text={title}/>
        <ListRow  text={leader} />
        <ListRow  text={status}/>
        <ListRow  text={deadlineDate}/>
      
        <ListRow  text={note} />
        <ListRow  text={updatedDate} />
  
      


        </div>
    </div>  
    </Wrapper>  
  )
}

export default List
