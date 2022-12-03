
//import momentTimezone from "moment-timezone"
import moment from "moment"

import { FaRegClipboard, FaRegCalendarCheck, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import { useAppContext } from '../context/appContext'


import Wrapper from '../assets/wrappers/Project'
import ProjectInfo from './ProjectInfo'


const SingleProject = () => {

  const { 

  editProjectId,
  title,
  leader,
  note,
  deadline,
  updatedAt,
  status, setEditProject, deleteProject } = useAppContext()
  
 
    let updatedDate = moment(updatedAt)
    updatedDate = updatedDate.local().format('MMM Do, YYYY')
  
    let deadlineDate = moment(deadline)
    deadlineDate = deadlineDate.local().format('ddd, MMM Do YYYY, h:mm:ss a')
  
  
    return (
      <>

      <Link
              to='/'
              className='btn global-btn'
            
            >
              Back Home
      </Link>

      <Wrapper>

        <header>
          <div className='main-icon'>{title.charAt(0)}</div>
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
            
            <ProjectInfo icon={<FaRegClipboard />} text={`Note: ${note}`} />
  
        
    
          </div>

          <footer>
          <div className='actions'>

          <Link
              to='/all-projects'
              className='btn global-btn'
            
            >
              All Projects
          </Link>
   
            <Link
              to='/add-project'
              className='btn edit-btn'
              onClick={() => setEditProject(editProjectId)}
            >
              Edit
            </Link>
            <button
              type='button'
              className='btn delete-btn'
              onClick={() => deleteProject(editProjectId)}
            >
              Delete
            </button>
          </div>
        </footer>
         
        </div>
      </Wrapper>
      </>
    )
  }
  
  export default SingleProject
  

