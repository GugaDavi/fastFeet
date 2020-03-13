import 'dotenv/config'

export const dbConfig = {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
}

export default `${dbConfig.dialect}:${dbConfig.password}@${dbConfig.host}:5432/${dbConfig.database}`
