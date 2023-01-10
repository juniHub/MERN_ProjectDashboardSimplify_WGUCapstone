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

  GET_SINGLE_PROJECT,

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

import { initialState } from './appContext'

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Please provide all values!',
    }
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: '',
    }
  }

  if (action.type === SETUP_USER_BEGIN) {
    return { ...state, isLoading: true }
  }
  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: true,
      token: action.payload.token,
      user: action.payload.user,
      showAlert: true,
      alertType: 'success',
      alertText: action.payload.alertText,
    }
  }
  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }
  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    }
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
    
    }
  }
  if (action.type === UPDATE_USER_BEGIN) {
    return { ...state, isLoading: true }
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      showAlert: true,
      alertType: 'success',
      alertText: 'User Profile Updated!',
    }
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }
  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      page: 1,
      [action.payload.name]: action.payload.value,
    }
  }
  if (action.type === CLEAR_VALUES) {
    const initialState = {
      isEditing: false,
      editProjectId: '',
      title: '',
      leader: '',
      note: '',
      deadline: Date.now,
      status: 'working',
    }

    return {
      ...state,
      ...initialState,
    }
  }

  if (action.type === CREATE_PROJECT_BEGIN) {
    return { ...state, isLoading: true }
  }

  if (action.type === CREATE_PROJECT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'New Project Created!',
    }
  }
  if (action.type === CREATE_PROJECT_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }

  if (action.type === GET_PROJECTS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false }
  }
  if (action.type === GET_PROJECTS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      projects: action.payload.projects,
      totalProjects: action.payload.totalProjects,
      numOfPages: action.payload.numOfPages,
    }
  }

  
  if (action.type === GET_SINGLE_PROJECT) {

    const project = state.projects.find((project) => project._id === action.payload.id)
    const {  _id, title, address, type, leader, note, deadline, status, updatedAt } = project
    return {
      
      ...state,
      isEditing: true,
      editProjectId: _id,
      title,
      address,
      type,
      leader,
      note,
      deadline,
      status,
      updatedAt,
    
    }
  }


  if (action.type === SET_EDIT_PROJECT) {
    const project = state.projects.find((project) => project._id === action.payload.id)
    const { _id, title, address, type, leader, note, deadline, status } = project
    return {
      ...state,

      isEditing: true,
      editProjectId: _id,
      title,
      address,
      type,
      leader,
      note,
      deadline,
      status,
    }
  }

  if (action.type === EDIT_PROJECT_BEGIN) {
    return {
      ...state,
      isLoading: true,
    }
  }
  if (action.type === EDIT_PROJECT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'Project Updated!',
    }
  }

  if (action.type === EDIT_PROJECT_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }


  if (action.type === DELETE_PROJECT_BEGIN) {
    return { ...state, isLoading: true }
  }

  if (action.type === SHOW_STATS_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    }
  }

  if (action.type === SHOW_STATS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      stats: action.payload.stats,
      monthlyProjects: action.payload.monthlyProjects,
    }
  }

 
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      searchTitle: '',
      searchLeader: '',
      searchNote: '',
      searchAddress: '',
      searchStatus: 'all',
      searchType: 'all',
      sort: 'latest updated',
    }
  }
  if (action.type === CHANGE_PAGE) {
    return { ...state, page: action.payload.page }
  }
  throw new Error(`no such action : ${action.type}`)
}

export default reducer
