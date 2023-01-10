
import Wrapper from '../assets/wrappers/LabelWrapper'
import ListRow from './ListRow'


const LabelRow = () => {
    return (
        <Wrapper>
        
        <div className='list'>
           <div className='list-center'>
           
      
            <ListRow  text="Title"/>
            <ListRow  text="Leader" />
            <ListRow  text="Address" />
            <ListRow  text="Type" />
            <ListRow  text="Status"/>
            <ListRow  text="Deadline"/>
         
            <ListRow  text="Updated" />
      
          
    
    
            </div>
        </div>  
        </Wrapper>  

    )
  }


  
  export default LabelRow
  