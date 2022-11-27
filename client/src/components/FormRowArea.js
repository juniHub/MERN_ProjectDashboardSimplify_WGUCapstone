const FormRowArea = ({ type, name, value, handleChange, labelText }) => {
    return (
      <div className='form-row'>
        <label htmlFor={name} className='form-label'>
          {labelText || name}
        </label>
        <textarea
        
          type={type}
          value={value}
          name={name}
          onChange={handleChange}
          className='form-textarea'
        />
      </div>
    )
  }
  
  export default FormRowArea
  