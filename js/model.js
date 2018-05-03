const db = require('../db')
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
  return (
    db('posts')
    .insert({ title: title, body: body })
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
        'posts.title'
      )
  )
}

function deletePost(title, body) {
  return(
    db('posts')
    .select('posts.id')
    .where('id', paper_id)
    .then(function(){
      return db('papers')
      .del()
      .where('id', paper_id)
      .returning('*')
    })
  )
}

module.exports = {
  create,
  getAll,
  deletePost,
  getOne
}
