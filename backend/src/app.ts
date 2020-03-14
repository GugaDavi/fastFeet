import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'path'

import './database'

import Routes from './routes'

class App {
  public server: express.Application;

  constructor () {
    this.server = express()
    this.middlewares()
    this.routes()
  }

  middlewares () {
    this.server.use(express.json())
    this.server.use(cors())
    this.server.use('/files', express.static(path.resolve(__dirname, '..', 'temp', 'uploads')))
    this.server.use('/signatures', express.static(path.resolve(__dirname, '..', 'temp', 'signatures')))
  }

  routes () {
    this.server.use(Routes)
  }
}

export default new App().server
