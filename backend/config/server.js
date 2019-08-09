const port = 3004

const bodyParser = require('body-parser')
const express = require('express')
const server = express()
const queryParser = require('express-query-int')

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())


server.listen(port, function() {
  console.log(`BACKEND is running on port ${port}.`)
})

module.exports = server