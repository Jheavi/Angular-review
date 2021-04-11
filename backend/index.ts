import { connect } from 'mongoose'
const express = require('express')
const morgan = require('morgan')
const chalk = require('chalk')
const cors = require('cors')
const postRouter = require('./src/routers/postRouter')
require('dotenv').config()

const server = express()

const port = process.env.PORT || 2130
const dbURL = process.env.dbURL

connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })

server.use(morgan('dev'))
server.use(cors())
server.use(express.json())

server.use('/', postRouter)

server.listen(port, () => {
  console.log(`The server is listening in port ${chalk.blueBright(port)}`)
})
