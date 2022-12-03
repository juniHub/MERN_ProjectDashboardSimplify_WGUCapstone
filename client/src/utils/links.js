import { IoBarChartSharp } from 'react-icons/io5'
import { MdQueryStats } from 'react-icons/md'
import { FaRegCalendarPlus, FaRegListAlt } from 'react-icons/fa'
import { ImProfile } from 'react-icons/im'

const links = [
  { id: 1, text: 'stats', path: '/', icon: <IoBarChartSharp /> },
  { id: 2, text: 'all projects', path: 'all-projects', icon: <MdQueryStats /> },
  { id: 3, text: 'add project', path: 'add-project', icon: <FaRegCalendarPlus /> },
  { id: 4, text: 'profile', path: 'profile', icon: <ImProfile /> },
  { id: 5, text: 'project list', path: 'project-list', icon: <FaRegListAlt  /> },
  
]

export default links
