import moment from "moment"
import Wrapper from '../assets/wrappers/ListWrapper'
import ListRow from './ListRow'
import { useAppContext } from '../context/appContext'
import { Link } from 'react-router-dom'

const List = ({
 

  _id,
  title,
 
  address,

  deadline,
  
  status,
  type,


})  => {
  const { setEditProject, deleteProject, getSingleProject} = useAppContext()
  
 
  let deadlineDate = moment.utc(deadline)
  deadlineDate = deadlineDate.local().format('ddd, MMM Do YYYY, h:mm:ss A')



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
       
      
        <ListRow  text={address} />
        <ListRow  text={type} />
      
       
        <ListRow  text={status}/>
        <ListRow  text={deadlineDate}/>

        <div className='action'>

        

        <Link
              to='/add-project'
              className='btn edit-btn'
              onClick={() => setEditProject(_id)}
            >
              Edit
        </Link>
        <button
              type='button'
              className='btn delete-btn'
              onClick={() => deleteProject(_id)}
            >
              Delete
        </button>

        </div>

    
  
        </div>

       

    </div>  
    </Wrapper>  
  )
}

export default List
