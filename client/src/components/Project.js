
//import momentTimezone from "moment-timezone"
import moment from "moment"
import { FaRegClipboard, FaRegCalendarCheck, FaCalendarAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/Project'
import ProjectInfo from './ProjectInfo'


const Project = ({
  _id,
  title,
  leader,
  note,
  deadline,
  updatedAt,
  status,
}) => {
  const { setEditProject, deleteProject } = useAppContext()

  let updatedDate = moment(updatedAt)
  updatedDate = updatedDate.format('MMM Do, YYYY')

  let deadlineDate = moment(deadline)
  deadlineDate = deadlineDate.format('ddd, MMM Do YYYY, h:mm:ss a')



  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{title.charAt(0)}</div>
        <div className='info'>
          <h5>{title}</h5>
          <p>Leader: {leader}</p>
          <div className={`status ${status}`}>{status}</div>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
        
          <ProjectInfo icon={<FaRegCalendarCheck />} text={`Deadline: ${deadlineDate}`} />
          
          <ProjectInfo icon={<FaRegClipboard />} text={`Note: ${note}`} />

          <ProjectInfo icon={<FaCalendarAlt />} text={`Updated: ${updatedDate}`} />
  
        </div>
        <footer>
          <div className='actions'>
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
