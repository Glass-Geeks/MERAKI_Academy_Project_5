const express = require('express');
const schoolRouter = express.Router()
const {
    createSchool,
    getAllSchools,
    getSchoolById,
    updateSchool,
    deleteSchool,
  }= require('../controllers/schools')

schoolRouter.get('/',getAllSchools)
schoolRouter.get('/:id',getSchoolById)
schoolRouter.post('/add',createSchool)
schoolRouter.put('/update',updateSchool)
schoolRouter.delete('/delete/:id',deleteSchool)

module.exports = schoolRouter