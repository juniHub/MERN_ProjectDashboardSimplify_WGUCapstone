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
    note,
    deadline,
    status,
    statusOptions,
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
              to='/'
              className='btn global-btn'
            >
              Back Home
          </Link>
          
      <form className='form'>
        <h3>{isEditing ? 'edit project' : 'add project'}</h3>
        {showAlert && <Alert />}
        <div className='form-center'>
          {/* title */}
          <FormRowArea
            type='text'
            labelText='Project Title'
            name='title'
            value={title}
            handleChange={handleProjectInput}
          />
          {/* leader */}
          <FormRowArea
            type='text'
            labelText='Project Leader'
            name='leader'
            value={leader}
            handleChange={handleProjectInput}
          />
          {/* Note  */}


          <FormRowArea
            type='text'
            labelText='Notes'
            name='note'
            value={note}
            handleChange={handleProjectInput}
          />

           {/* status */}
          <FormRowSelect
            name='status'
            value={status}
            handleChange={handleProjectInput}
            list={statusOptions}
          />
          {/* deadline */}
          <FormRow
            type='datetime-local'
            name='deadline'
            labelText='deadline'
            value={deadline}
            handleChange={handleProjectInput}
           
          />
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
        </div>
      </form>
    </Wrapper>
  )
}

export default AddProject
