import moment from "moment"
import Wrapper from '../assets/wrappers/ListWrapper'
import ListRow from './ListRow'
import { useAppContext } from '../context/appContext'
import { Link } from 'react-router-dom'

const List = ({
 

  _id,
  title,
  leader,
  address,

  deadline,
  updatedAt,
  status,
  type,


}) => {

  const {  getSingleProject} = useAppContext()
  
  let updatedDate = moment(updatedAt)
  updatedDate = updatedDate.local().format('MMM Do, YYYY')

  let deadlineDate = moment(deadline)
  deadlineDate = deadlineDate.local().format('ddd, MMM Do YYYY, h:mm:ss a')



  return (
   <Wrapper>
    <div className='list'>
       <div className='list-center'>
       
          <Link

              className='link list-link'
              to={`/projects/${_id}`}
             
              onClick={() => getSingleProject(_id)}
            >

          {title}

          </Link> 
       
        <ListRow  text={leader} />
        <ListRow  text={address} />
        <ListRow  text={type} />
        <ListRow  text={status}/>
        <ListRow  text={deadlineDate}/>
    
        <ListRow  text={updatedDate} />
     
  
      


        </div>
    </div>  
    </Wrapper>  
  )
}

export default List
