import Project from '../models/Project.js'
import { StatusCodes } from 'http-status-codes'
import {
  BadRequestError,
  NotFoundError,
  
} from '../errors/index.js'
import checkPermissions from '../utils/checkPermissions.js'
import mongoose from 'mongoose'
import moment from 'moment'


const createProject = async (req, res) => {
  const { title, leader, address } = req.body

  if (!title || !leader || !address) {
    throw new BadRequestError('Please provide all values')
  }
  req.body.createdBy = req.user.userId
  const project = await Project.create(req.body)
  res.status(StatusCodes.CREATED).json({ project })
}


const getAllProjects = async (req, res) => {
  const { status, type, sort, searchTitle, searchLeader, searchNote, searchAddress} = req.query

  const queryObject = {
    createdBy: req.user.userId,
  }


  if (status && status !== 'all') {
    queryObject.status = status
  }

  if (type && type !== 'all') {
    queryObject.type = type
  }
 
  if (searchTitle) {
    queryObject.title = { $regex: searchTitle, $options: 'i' }
 
  }

   
  if (searchLeader) {
    queryObject.leader = { $regex: searchLeader, $options: 'i' }
   
  }

  if (searchNote) {
    queryObject.note = { $regex: searchNote, $options: 'i' }
   
  }

  if (searchAddress) {
    queryObject.address = { $regex: searchAddress, $options: 'i' }
   
  }


  let result = Project.find(queryObject)


  if (sort === 'latest updated') {
    result = result.sort('-updatedAt')
  }
  if (sort === 'oldest updated') {
    result = result.sort('updatedAt')
  }

  if (sort === 'nearest deadline') {
    result = result.sort('deadline')
  }
  if (sort === 'furthest deadline') {
    result = result.sort('-deadline')
  }

 

  // setup pagination
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

  result = result.skip(skip).limit(limit)

  const projects = await result

  const totalProjects = await Project.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalProjects / limit)

  res.status(StatusCodes.OK).json({ projects, totalProjects, numOfPages })
}


const updateProject = async (req, res) => {
  const { id: projectId } = req.params
  const { title, leader, address } = req.body

  if (!title || !leader || !address) {
    throw new BadRequestError('Please provide all values')
  }
  const project = await Project.findOne({ _id: projectId })

  if (!project) {
    throw new NotFoundError(`No project with id :${projectId}`)
  }
  // check permissions

  checkPermissions(req.user, project.createdBy)

  const updatedProject = await Project.findOneAndUpdate({ _id: projectId }, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(StatusCodes.OK).json({ updatedProject })
}


const deleteProject = async (req, res) => {
  const { id: projectId } = req.params

  const project = await Project.findOne({ _id: projectId })

  if (!project) {
    throw new NotFoundError(`No project with id :${projectId}`)
  }

  checkPermissions(req.user, project.createdBy)

  await project.remove()

  res.status(StatusCodes.OK).json({ msg: 'Success! Project removed' })
}

//status group count
const showStats = async (req, res) => {
  let stats = await Project.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ])
  stats = stats.reduce((acc, curr) => {
    const { _id: status, count } = curr
    acc[status] = count
    return acc
  }, {})

  const defaultStats = {
    working: stats.working || 0,
    finished: stats.finished || 0,
    cancelled: stats.cancelled || 0,
  }

  //monthly count
  let monthlyProjects = await Project.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: '$deadline' }, month: { $month: '$deadline' } }, 
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
  
  ])


  monthlyProjects = monthlyProjects
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item
      const date = moment()
        .month(month - 1)
        .year(year)
        .format('MMM Y')
      return { date, count }
    })
    .reverse()

  res.status(StatusCodes.OK).json({ defaultStats, monthlyProjects })
}

export { createProject, deleteProject, getAllProjects, updateProject, showStats }
