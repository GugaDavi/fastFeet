import Sequelize, { Model } from 'sequelize'

class DeliverymanModel extends Model {
  readonly id!: number
  name!: string
  email!: string
  readonly created_at!: Date
  readonly updated_at!: Date

  static init (sequelize) {
    super.init({
      name: Sequelize.STRING,
      email: Sequelize.STRING
    }, { sequelize, tableName: 'deliverymans' })

    return this
  }

  static associate (models: any): void {
    this.belongsTo(models.FileModel, { foreignKey: 'avatar_id', as: 'avatar' })
  }
}

export default DeliverymanModel
