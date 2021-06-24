import { Express } from 'express'
import { User } from '../common/User'
import { Article } from '../common/Article'
import { sequelize } from '../common/sequelize'
import { join } from 'path'

interface Config {
  dev: boolean
  apiFolder: string
  assetsFolder: string
  url: string
  jsonLimit: string
  extension: string
}

Article.belongsTo(User)
User.hasMany(Article)

export default async (app: Express, config: Config) => {
  await sequelize.sync()
  app.use('*', (req, res) => res.sendFile(join(config.assetsFolder, 'index.html')))
}