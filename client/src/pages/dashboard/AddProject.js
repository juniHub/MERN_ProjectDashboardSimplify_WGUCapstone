import { Link } from 'react-router-dom'

import { FormRow, FormRowSelect, FormRowArea, Alert } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'

const AddProject = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    title,
    leader,
    address,
    type,
    note,
    deadline,
    status,
    statusOptions,
    typeOptions,
    handleChange,
    clearValues,
    createProject,
    editProject,
  } = useAppContext()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title || !leader) {
      displayAlert()
      return
    }
    if (isEditing) {
      editProject()
      return
    }
    createProject()
  }
  const handleProjectInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    handleChange({ name, value })
  }

  return (
    <Wrapper>
      
         <Link
              to='/all-projects'
              className='btn global-btn'
            >
              Back to All Projects
          </Link>
          
      <form className='form'>
        <h3>{isEditing ? 'edit project' : 'add project'}</h3>
        {showAlert && <Alert />}
        <div className='form-center'>
          {/* title */}
          <FormRow
            type='text'
            labelText='Title/Customer Name'
            name='title'
            value={title}
            handleChange={handleProjectInput}
          />
          {/* address */}
          <FormRow
            type='text'
            labelText='Address'
            name='address'
            value={address}
            handleChange={handleProjectInput}
          />
          {/* leader */}
          <FormRow
            type='text'
            labelText='Leader/Manager'
            name='leader'
            value={leader}
            handleChange={handleProjectInput}
          />
       
          {/* type */}
            <FormRowSelect
            name='type'
            value={type}
            handleChange={handleProjectInput}
            list={typeOptions}
          />

          {/* deadline */}
          <FormRow
            type='datetime-local'
            name='deadline'
            labelText='deadline'
            value={deadline}
            handleChange={handleProjectInput}
           
          />

           {/* status */}
          <FormRowSelect
            name='status'
            value={status}
            handleChange={handleProjectInput}
            list={statusOptions}
          />

          
         </div>


         <div className='form-row-area'>
        
          {/* Note  */}
          <FormRowArea
            type='text'
            labelText='Notes'
            name='note'
            value={note}
            handleChange={handleProjectInput}
          />

          </div>


          {/* btn container */}
          <div className='btn-container'>
            <button
              type='submit'
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
            <button
              className='btn btn-block clear-btn'
              onClick={(e) => {
                e.preventDefault()
                clearValues()
              }}
            >
              clear
            </button>
          </div>
        
      </form>
    </Wrapper>
  )
}

export default AddProject
