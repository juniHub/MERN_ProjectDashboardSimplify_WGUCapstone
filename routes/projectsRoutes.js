import express from 'express'
const router = express.Router()

import {
  createProject,
  deleteProject,
  getAllProjects,

  updateProject,
  showStats,
} from '../controllers/projectsController.js'

router.route('/').post(createProject).get(getAllProjects)
router.route('/stats').get(showStats)
router.route('/:id').delete(deleteProject).patch(updateProject)

export default router
