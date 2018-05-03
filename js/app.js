const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const authController = require('./controller')

// if(process.env.NODE_ENV !== 'production'){
//   require('dotenv').load()
// }

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())

//////////////////////////////////////////////////////////////////////////////
// Routes
//////////////////////////////////////////////////////////////////////////////

app.use('/posts', require('./routes.js'))
// app.use('/users', require('./routes/users'))


//////////////////////////////////////////////////////////////////////////////
// Default Route
//////////////////////////////////////////////////////////////////////////////

app.use(function(req, res, next){
  next({status: 404, message: 'Route not found' })
})

//////////////////////////////////////////////////////////////////////////////
// Error Handling
//////////////////////////////////////////////////////////////////////////////

app.use(function(err, req, res, next){
  const errorMessage = {}
  console.log(err)
  if(process.env.NODE_ENV !== 'production' && err.stack)
    errorMessage.stack = err.stack

  errorMessage.status = err.status || 500
  errorMessage.message = err.message || 'Internal Server Error'

  res.status(errorMessage.status).send(errorMessage)
})

//////////////////////////////////////////////////////////////////////////////
// Starting Server
//////////////////////////////////////////////////////////////////////////////

const port = 3000

app.listen(port, function(){
  console.log(`Listening on port ${port}`)
})
