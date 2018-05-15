// // const express = require('express')
// // const bodyParser = require('body-parser')
// // const morgan = require('morgan')
// // const cors = require('cors')
//
//
// // if(process.env.NODE_ENV !== 'production'){
// //   require('dotenv').load()
// // }
//
// const app = express()
//
// app.use(cors())
// app.use(morgan('dev'))
// app.use(bodyParser.json())
//
// //////////////////////////////////////////////////////////////////////////////
// // Routes
// //////////////////////////////////////////////////////////////////////////////
//
// app.use('/', require('./routes.js'))
// // app.use('/users', require('./routes/users'))
//
//
// //////////////////////////////////////////////////////////////////////////////
// // Default Route
// //////////////////////////////////////////////////////////////////////////////
//
// app.use(function(req, res, next){
//   next({status: 404, message: 'Route not found' })
// })
//
// //////////////////////////////////////////////////////////////////////////////
// // Error Handling
// //////////////////////////////////////////////////////////////////////////////
//
// // app.use(function(err, req, res, next){
// //   const errorMessage = {}
// //   console.log(err)
// //   if(process.env.NODE_ENV !== 'development' && err.stack)
// //     errorMessage.stack = err.stack
// //
// //   errorMessage.status = err.status || 500
// //   errorMessage.message = err.message || 'Internal Server Error'
// //
// //   res.status(errorMessage.status).send(errorMessage)
// // })
//
// //////////////////////////////////////////////////////////////////////////////
// // Starting Server
// //////////////////////////////////////////////////////////////////////////////
//
// const port = process.env.PORT || 3000
//
// app.listen(port, function(){
//   console.log(`Listening on port ${port}`)
// })







const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())

app.disable('x-powered-by')
app.use(bodyParser.json())
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

// const messagesRoutes = require('./src/routes/messages')

app.use('/', require('./routes.js'))




app.use((err, req, res, next) => {
  console.error(err)
  const status = err.status || 500
  res.status(status).json({ error: err })
})

app.use((req, res, next) => {
  res.status(404).json({ error: { message: 'Not found' }})
})

const listener = () => console.log(`Listening on port ${port}!`)
app.listen(port, listener)

module.exports = app
