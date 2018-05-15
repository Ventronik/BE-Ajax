const express = require('express')
const router = express.Router()
const userController = require('./controller')

//////////////////////////////////////////////////////////////////////////////
// Basic CRUD Methods
//////////////////////////////////////////////////////////////////////////////

router.post('/post', userController.create)

router.get('/', userController.getAll)

router.get('/:id/', userController.getOne)

router.put('/:id', userController.editPost)

router.delete('/:id/', userController.deletePost)




module.exports = router
