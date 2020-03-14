import Sequelize, { Model } from 'sequelize'

class DeliveryProblemModel extends Model {
  readonly id!: number
  public description!: string
  public delivery_id!: number
  readonly created_at!: Date
  readonly updated_at!: Date

  static init (sequelize) {
    super.init({
      description: Sequelize.STRING

    }, { sequelize, tableName: 'delivery_problems' })

    return this
  }

  static associate (models: any): void {
    this.belongsTo(models.PackageModel, { foreignKey: 'delivery_id', as: 'delivery' })
  }
}

export default DeliveryProblemModel
