const userModel = require('./model')

//////////////////////////////////////////////////////////////////////////////
// Basic CRUD Methods
//////////////////////////////////////////////////////////////////////////////

function create(req, res, next){

  if(!req.body.title){
    return next({ status: 400, message: 'Title Required'})
  }

  if(!req.body.body){
    return next({ status: 400, message: 'Body Required'})
  }

  userModel.create(req.body.title, req.body.body)
  .then(function(data){
    return res.status(201).send({ data })
  })
  .catch(next)
}

function getAll(req, res, next) {

  userModel.getAll(req.params.id)
  .then(function(data){
    return res.status(200).send({ data })
  })
  .catch(next)
}

function getOne(req,res, next){
  userModel.getOne(req.params.id)
  .then(function(data){
    return res.status(201).send({ data })
  })
  .catch(next)
}

function deletePost(req, res, next) {
  userModel.deletePost(req.params.id)
  .then (function(data){
    return res.status(204).send({ data })
  })
  .catch(next)
}

//////////////////////////////////////////////////////////////////////////////
// Quality of Life functions
//////////////////////////////////////////////////////////////////////////////

module.exports = {
  create,
  getAll,
  getOne,
  deletePost
}
