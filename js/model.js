const db = require('../db')
const uuidv4 = require('uuid/v4');


//////////////////////////////////////////////////////////////////////////////
// Basic CRUD Methods
//////////////////////////////////////////////////////////////////////////////

function getOne(id){
  return (
    db('posts')
    .where({ id })
    .first()
  )
}

function create(title, body){
  let uuid = uuidv4()
  return (
    db('posts')
    .insert({ title: title, body: body, uuid: uuid })
    .returning('*')
  )
  .then(function([ data ]){
    return data
  })
}

function getAll(id) {
  return (
    db('posts')
      .select(
        'posts.body',
        'posts.title',
        'posts.uuid'
      )
  )
}

function editPost(uuid, title, body){
  console.log(arguments)
  return (
    db('posts')
      .update({ title, body })
      .where({ uuid: uuid})
      .returning('*')
    .then(function([data]){
      return data
    })
  )
}

function deletePost(uuid) {
  return(
    db('posts')
    .del()
    .where('uuid', uuid)
    .returning('*')
    .then(function([data]){
      delete data.id
      return data
    })
  )
}

module.exports = {
  create,
  getAll,
  deletePost,
  getOne,
  editPost
}
