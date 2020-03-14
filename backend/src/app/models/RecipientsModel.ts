import Sequelize, { Model } from 'sequelize'

class RecipientsModel extends Model {
  readonly id!: number
  public name!: string
  public address_id!: number
  readonly created_at!: Date
  readonly updated_at!: Date

  static init (sequelize) {
    super.init({
      name: Sequelize.STRING
    }, { sequelize, tableName: 'recipients' })
  }

  static associate (models: any): void {
    this.belongsTo(models.AddressModel, { foreignKey: 'address_id', as: 'address' })
  }
}

export default RecipientsModel
