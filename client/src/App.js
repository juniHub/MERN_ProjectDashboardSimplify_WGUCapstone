import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Register, Landing, Error, ProtectedRoute } from './pages'
import {
  AllProjects,
  Profile,
  SharedLayout,
  Stats,
  AddProject,
  ProjectList,
 
} from './pages/dashboard'

import SingleProject from './components/SingleProject'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Stats />} />
          <Route path='all-projects' element={<AllProjects />} />
          <Route path='add-project' element={<AddProject />} />
          <Route path='/projects/:id' element={<SingleProject />} />
          <Route path='project-list' element={<ProjectList />} />
          <Route path='profile' element={<Profile />} />
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/landing' element={<Landing />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
