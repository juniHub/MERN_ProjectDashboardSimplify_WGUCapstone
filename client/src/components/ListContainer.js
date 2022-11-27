import { useAppContext } from '../context/appContext'
import { useEffect } from 'react'
import Loading from './Loading'
import List from './List'
import LabelRow from './LabelRow'

import PageBtnContainer from './PageBtnContainer'

const ListContainer = () => {
  const {
    getProjects,
    projects,
    isLoading,
    page,
    totalProjects,
    search,
    searchStatus,
  
    sort,
    numOfPages,
  } = useAppContext()
  useEffect(() => {
    getProjects()
    // eslint-disable-next-line
  }, [page, search, searchStatus,  sort])
  if (isLoading) {
    return <Loading center />
  }

  if (projects.length === 0) {
    return (
   
        <h2>No projects to display...</h2>
  
    )
  }

  return (
    <>
      <h5>
        {totalProjects} Project{projects.length > 1 && 's'} found
      </h5>

     <LabelRow/>

        {projects.map((project) => {
          return <List key={project._id} {...project} />
        })}
     
   
      {numOfPages > 1 && <PageBtnContainer />}
    </>
  )
}

export default ListContainer
