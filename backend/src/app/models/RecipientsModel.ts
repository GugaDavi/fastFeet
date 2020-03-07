import Sequelize, { Model } from 'sequelize'
import AddressModel from './AddressModel'

class RecipientsModel extends Model {
  readonly id!: number;
  public name!: string;
  readonly created_at!: Date
  readonly updated_at!: Date

  static init (sequelize) {
    super.init({
      name: Sequelize.STRING
    }, { sequelize, tableName: 'recipients' })
  }
}

export default RecipientsModel
