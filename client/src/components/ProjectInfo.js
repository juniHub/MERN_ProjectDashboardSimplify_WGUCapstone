import Wrapper from '../assets/wrappers/ProjectInfo'

const ProjectInfo = ({ icon, text, underline }) => {
  return (
    <Wrapper>
      <span className='icon'>{icon}</span>
      {underline ? <span className='underline'>{text}</span>:
        <span className='text'>{text}</span>}
     
    </Wrapper>
  )
}

export default ProjectInfo
