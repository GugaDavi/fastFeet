import { Sequelize } from 'sequelize'

import UserModel from '../app/models/UserModel'

import urlConnection from '../config/database'
import RecipientsModel from '../app/models/RecipientsModel'
import AddressModel from '../app/models/AddressModel'

const models = [AddressModel, UserModel, RecipientsModel]

class Database {
  public connection!: Sequelize

  constructor () {
    this.init()
  }

  init () {
    this.connection = new Sequelize(urlConnection)
    models.map(model => model.init(this.connection))
    models.map(model => model.associate && model.associate(this.connection.models))
  }
}

export default new Database()
