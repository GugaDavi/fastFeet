
import Sequelize, { Model } from 'sequelize'

class FileModel extends Model {
  readonly id!: number;
  name!: string;
  path!: string;
  readonly created_at!: Date;
  readonly updated_at!: Date;

  static init (sequelize: any) {
    super.init({
      name: Sequelize.STRING,
      path: Sequelize.STRING,
      url: {
        type: Sequelize.VIRTUAL,
        get (): string {
          return `${process.env.APP_URL}:${process.env.APP_PORT}/files/${this.path}`
        }
      }
    }, { sequelize, tableName: 'files' })

    return this
  }
}

export default FileModel
