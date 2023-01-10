
//import momentTimezone from "moment-timezone"
import moment from "moment"

import { FaRegCalendarCheck, FaUser} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/Project'
import ProjectInfo from './ProjectInfo'


const Project = ({
  _id,
  title,
  leader,
  
  deadline,
  updatedAt,
  status,
 

}) => {
  const { setEditProject, deleteProject, getSingleProject} = useAppContext()


  let updatedDate = moment(updatedAt)
  updatedDate = updatedDate.local().format('MMM Do, YYYY')

  let deadlineDate = moment(deadline)
  deadlineDate = deadlineDate.local().format('ddd, MMM Do YYYY, hh:mm:ss A')


  return (
    <Wrapper>
      <header>

        <div className='main-icon'>
        <Link

              className='link'
              to={`/projects/${_id}`}
             
              onClick={() => getSingleProject(_id)}
            >
        {title.charAt(0)}

        </Link>
        
        </div>
        <div className='info'>
          
         <h5>{title}</h5>
         <p>Updated: {updatedDate}</p>
        
          <div className={`status ${status}`}>{status}</div>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>

          <ProjectInfo icon={<FaUser />} text={`Leader: ${leader}`} />
          
        
        
          <ProjectInfo icon={<FaRegCalendarCheck />} text={`Deadline: ${deadlineDate}`} />
          
          
  
        </div>
        <footer>
          <div className='actions'>

          <Link
              to={`/projects/${_id}`}
              className='btn global-btn'
              onClick={() => getSingleProject(_id)}
            >
              See Details
            </Link>
        
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
        </footer>
      </div>
    </Wrapper>
  )
}

export default Project
