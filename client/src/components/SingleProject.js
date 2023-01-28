
//import momentTimezone from "moment-timezone"
import moment from "moment"

import { FaRegClipboard, FaCalendarAlt, FaRulerCombined, FaRegCalendarCheck, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import { useAppContext } from '../context/appContext'


import Wrapper from '../assets/wrappers/Project'
import ProjectInfo from './ProjectInfo'


const SingleProject = () => {

  const { 

  editProjectId,
  
  title,
  address,
  type,
  leader,
  note,
  deadline,
  updatedAt,
  status, setEditProject} = useAppContext()
  
 
    let updatedDate = moment.utc(updatedAt)
    updatedDate = updatedDate.local().format('MMM Do, YYYY, h:mm:ss A')
  
    let deadlineDate = moment.utc(deadline)
    deadlineDate = deadlineDate.local().format('ddd, MMM Do YYYY, h:mm:ss A')
  
  
    return (
      <>

        <Link
              to='/all-projects'
              className='btn global-btn'
            
            >
              Back to All Projects
          </Link>
   

      <Wrapper>

        <header>
          <div className='main-icon'>{title.charAt(0)}</div>
          <div className='info'>
        
          
           <h5>{title}</h5>
          
           <p>Address: {address}</p>
        
            <div className={`status ${status}`}>{status}</div>
          </div>
        </header>
        <div className='content'>
          <div className='content-center'>

            <ProjectInfo icon={<FaRulerCombined />} text={`Type: ${type}`} />

            <ProjectInfo icon={<FaRegCalendarCheck />} text={`ETC: ${deadlineDate}`} />

            <ProjectInfo icon={<FaUser />} text={`Leader/Manager: ${leader}`} />

            <ProjectInfo icon={<FaCalendarAlt />} text={`Updated: ${updatedDate}`} />

            <ProjectInfo icon={<FaRegClipboard />} text={`Note: ${note}`} />

        
          </div>

          <footer>
          <div className='actions'>

  
            <Link
              to='/add-project'
              className='btn edit-btn'
              onClick={() => setEditProject(editProjectId)}
            >
              Edit
            </Link>
          
          </div>
        </footer>
         
        </div>
      </Wrapper>
      </>
    )
  }
  
  export default SingleProject
  

