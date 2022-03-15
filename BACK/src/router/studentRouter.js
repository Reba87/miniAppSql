const {Router} = require('express');


const router = Router()
const crtl = require('../controller/studentsController')

router.get("/students",crtl.student)

module.exports = router