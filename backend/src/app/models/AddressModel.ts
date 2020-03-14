import Sequelize, { Model } from 'sequelize'

import RecipientsModel from './RecipientsModel'

class AddressModel extends Model {
  readonly id!: number
  public street!: string
  public house_number!: string
  public complement?: string
  public state!: string
  public city!: string
  public zip_code!: string
  public created_at!: Date
  public updated_at!: Date

  static init (sequelize) {
    super.init({
      street: Sequelize.STRING,
      house_number: Sequelize.STRING,
      complement: Sequelize.STRING,
      state: Sequelize.STRING,
      city: Sequelize.STRING,
      zip_code: Sequelize.STRING
    }, { sequelize, tableName: 'address' })

    return this
  }
}

export default AddressModel
