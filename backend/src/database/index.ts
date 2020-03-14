import { Sequelize } from 'sequelize'

import urlConnection from '../config/database'

import UserModel from '../app/models/UserModel'
import RecipientsModel from '../app/models/RecipientsModel'
import AddressModel from '../app/models/AddressModel'
import DeliverymanModel from '../app/models/DeliverymanModel'
import FileModel from '../app/models//FileModel'
import SignatureModel from '../app/models/SignatureModel'
import PackageModel from '../app/models/PackageModel'

const models = [AddressModel, UserModel, PackageModel, RecipientsModel, DeliverymanModel, FileModel, SignatureModel]

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
