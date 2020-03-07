import express from 'express'
import cors from 'cors'

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
  }

  routes () {
    this.server.use(Routes)
  }
}

export default new App().server
