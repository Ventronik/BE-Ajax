const express = require('express')
const router = express.Router()
const userController = require('./controller')

//////////////////////////////////////////////////////////////////////////////
// Basic CRUD Methods
//////////////////////////////////////////////////////////////////////////////

router.post('/', userController.create)

router.get('/', userController.getAll)

router.get('/:id/', userController.getOne)

// router.delete('/:id/', userController.paperDelete)




module.exports = router
