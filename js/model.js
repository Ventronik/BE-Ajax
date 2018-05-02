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

function postPapers(data, id) {
  const abstract = data.abstract
  const authors = data.authors
  const field = data.field
  const url = data.url
  const user_id = id
  const title = data.title

  return (
    db('papers')
      .insert({ abstract, authors, field, url, title, user_id })
    .returning('*')
    .then(function([ data ]){
      return db('paper_status')
                .insert( {paper_id: data.id, status_id:1 }) //all papers are created with the status pending(1)
      .returning('*')
    }
    )
  )
}

function paperStatusChange(status_id, paper_id) {
  return (
  db('paper_status')
    .insert({status_id, paper_id})
  .returning('*')
  )
}

function paperDelete(paper_id, id) {
  return(
    db('papers')
    .select('papers.user_id')
    .where('id', paper_id)
    .then(function(result){
      let [{ user_id }] = result
      console.log(user_id, parseInt(id))
      if(user_id !== parseInt(id)) {
        throw {status:403, message: 'Missing permission to access paper'}
      }
    })
    .then(function(){
    db('comments')
      .del()
      .where('paper_id', paper_id)
    .then(function(){
      return db('paper_status')
      .del()
      .where('paper_id', paper_id)
    })
    .then(function(){
      return db('papers')
      .del()
      .where('id', paper_id)
      .returning('*')
    })
  })
  )
}

module.exports = {
  getOneByUserName,
  create,
  getAllUserPapers,
  postPapers,
  paperStatusChange,
  paperDelete
}
