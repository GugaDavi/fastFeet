import Sequelize, { Model } from 'sequelize'
import bcrypt from 'bcryptjs'

class UserModel extends Model {
  readonly id!: number
  name!: string
  email!: string
  password?: string
  password_hash!: string
  readonly created_at!: Date
  readonly updated_at!: Date

  static init (sequelize) {
    super.init({
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.VIRTUAL,
      password_hash: Sequelize.STRING
    }, { sequelize, tableName: 'users' })

    this.addHook('beforeSave', async (user: UserModel) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8)
      }
    })

    return this
  }

  async checkPassword (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password_hash)
  }
}

export default UserModel
