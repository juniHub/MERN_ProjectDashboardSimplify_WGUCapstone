import { FormRow, FormRowSelect } from '.'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/SearchContainer'

const SearchContainer = () => {
  const {
    isLoading,

    searchTitle,
    searchLeader,
    searchNote,
    searchAddress,
    searchType,
    searchStatus,
    sort,
    sortOptions,
    typeOptions,
    handleChange,
    clearFilters,
   
    statusOptions,
  } = useAppContext()
  
  const handleSearch = (e) => {
    if (isLoading) return
    handleChange({ name: e.target.name, value: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    clearFilters()
  }
  return (
    <Wrapper>
      <form className='form'>
        <h4>Search Project</h4>
        <div className='form-center'>
  

          <FormRow
            labelText='Search Title/Customer'
            type='text'
            id='searchTitle'
            name='searchTitle'
            value={searchTitle}
            handleChange={handleSearch}
          />

          <FormRow
            labelText='Search Leader/Manager'
            type='text'
            id='searchLeader'
            name='searchLeader'
            value={searchLeader}
            handleChange={handleSearch}
          />

          <FormRow
            labelText='Search Address'
            type='text'
            id='searchAddress'
            name='searchAddress'
            value={searchAddress}
            handleChange={handleSearch}
          />

          <FormRow
            labelText='Search Notes'
            type='text'
            id='searchNote'
            name='searchNote'
            value={searchNote}
            handleChange={handleSearch}
          />


          {/* filter status */}

          <FormRowSelect
            labelText='type'
            name='searchType'
            value={searchType}
            handleChange={handleSearch}
            list={['all', ...typeOptions]}
          />

          <FormRowSelect
            labelText='status'
            name='searchStatus'
            value={searchStatus}
            handleChange={handleSearch}
            list={['all', ...statusOptions]}
          />
            
          {/* sort */}

          <FormRowSelect
            name='sort'
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          
          <button
            className='btn btn-block btn-danger'
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default SearchContainer
