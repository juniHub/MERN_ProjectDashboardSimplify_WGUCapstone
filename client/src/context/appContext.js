import React, { useReducer, useContext } from 'react'

import reducer from './reducer'
import axios from 'axios'
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,

  CREATE_PROJECT_BEGIN,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_ERROR,
  GET_PROJECTS_BEGIN,
  GET_PROJECTS_SUCCESS,
  SET_EDIT_PROJECT,
  DELETE_PROJECT_BEGIN,
  EDIT_PROJECT_BEGIN,
  EDIT_PROJECT_SUCCESS,
  EDIT_PROJECT_ERROR,
 
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
} from './actions'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')


const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token,
  showSidebar: false,
  isEditing: false,
  editProjectId: '',
  title: '',
  leader: '',
  note: 'some note here',
  deadline: Date.now,
  statusOptions: ['finished', 'cancelled', 'working'],
  status: 'working',
  projects: [],
  totalProjects: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyProjects: [],
  search: '',
  searchStatus: 'all',
  sort: 'latest updated',
  sortOptions: ['latest updated', 'oldest updated', 'nearest deadline', 'furthest deadline'],
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // axios
  const authFetch = axios.create({
    baseURL: '/api/v1',
  })
  // request

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common['Authorization'] = `Bearer ${state.token}`
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  // response

  authFetch.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      // console.log(error.response)
      if (error.response.status === 401) {
        logoutUser()
      }
      return Promise.reject(error)
    }
  )

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT })
    clearAlert()
  }

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT })
    }, 3000)
  }

  const addUserToLocalStorage = ({ user, token}) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
    
  }

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
   
  }

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN })
    try {
      const { data } = await axios.post(`/api/v1/auth/${endPoint}`, currentUser)

      const { user, token } = data
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, alertText },
      })
      addUserToLocalStorage({ user, token })
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR })
  }

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER })
    removeUserFromLocalStorage()
  }
  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN })
    try {
      const { data } = await authFetch.patch('/auth/updateUser', currentUser)

      const { user,  token } = data

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, token },
      })
      addUserToLocalStorage({ user, token })
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        })
      }
    }
    clearAlert()
  }

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } })
  }
  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES })
  }
  const createProject = async () => {
    dispatch({ type: CREATE_PROJECT_BEGIN })
    try {
      const { title, leader, note, deadline, status } = state
      await authFetch.post('/projects', {
        title,
        leader,
        note,
        deadline,
        status,
      })
      dispatch({ type: CREATE_PROJECT_SUCCESS })
      dispatch({ type: CLEAR_VALUES })
    } catch (error) {
      if (error.response.status === 401) return
      dispatch({
        type: CREATE_PROJECT_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }

  const getProjects = async () => {
    const { page, search, searchStatus, sort } = state

    let url = `/projects?page=${page}&status=${searchStatus}&sort=${sort}`

 
    if (search) {
      url = url + `&search=${search}`
      
    }

 
    dispatch({ type: GET_PROJECTS_BEGIN })
    try {
      const { data } = await authFetch(url)
      const { projects, totalProjects, numOfPages } = data
      dispatch({
        type: GET_PROJECTS_SUCCESS,
        payload: {
          projects,
          totalProjects,
          numOfPages,
        },
      })
    } catch (error) {
      logoutUser()
    }

    clearAlert()
  }

  const setEditProject = (id) => {
    dispatch({ type: SET_EDIT_PROJECT, payload: { id } })
  }
  
  const editProject = async () => {
    dispatch({ type: EDIT_PROJECT_BEGIN })

    try {
      const { title, leader, note, deadline, status } = state
      await authFetch.patch(`/projects/${state.editProjectId}`, {
        title,
        leader,
        note,
        deadline,
        status,
      })
      dispatch({ type: EDIT_PROJECT_SUCCESS })
      dispatch({ type: CLEAR_VALUES })
    } catch (error) {
      if (error.response.status === 401) return
      dispatch({
        type: EDIT_PROJECT_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }
  const deleteProject = async (projectId) => {
    dispatch({ type: DELETE_PROJECT_BEGIN })
    try {
      await authFetch.delete(`/projects/${projectId}`)
      getProjects()
    } catch (error) {
      logoutUser()
    }
  }

  //status report page
  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN })
    try {
      const { data } = await authFetch('/projects/stats')
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyProjects: data.monthlyProjects,
        },
      })
    } catch (error) {
      logoutUser()
    }
    clearAlert()
  }

  
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS })
  }
  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } })
  }
  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createProject,
        getProjects,
        setEditProject,
        deleteProject,
        editProject,
        showStats,
        clearFilters,
        changePage,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }
