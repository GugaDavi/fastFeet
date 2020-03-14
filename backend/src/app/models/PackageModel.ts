import Sequelize, { Model } from 'sequelize'

class PackageModel extends Model {
  readonly id!: number;
  public recipient_id!: number;
  public deliveryman_id!: number;
  public signature_id!: number;
  public product!: string
  public canceled_at?: Date
  public start_date?: Date
  public end_date?: Date
  readonly created_at!: Date
  readonly updated_at!: Date

  static init (sequelize: any) {
    super.init({
      product: Sequelize.STRING,
      canceled_at: Sequelize.DATE,
      start_date: Sequelize.DATE,
      end_date: Sequelize.DATE
    }, { sequelize, tableName: 'packages' })
  }

  static associate (models: any): void {
    this.belongsTo(models.RecipientsModel, { foreignKey: 'recipient_id', as: 'recipient' })
    this.belongsTo(models.DeliverymanModel, { foreignKey: 'deliveryman_id', as: 'deliveryman' })
    this.belongsTo(models.SignatureModel, { foreignKey: 'signature_id', as: 'signature' })
  }
}

export default PackageModel
