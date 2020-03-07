export const dbConfig = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'fastfeet',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
}

export default `${dbConfig.dialect}:${dbConfig.password}@${dbConfig.host}:5432/${dbConfig.database}`
