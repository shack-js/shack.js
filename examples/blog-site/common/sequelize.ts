import SequelizeModule from 'sequelize'
import { join } from 'path'

const { Sequelize } = SequelizeModule
export const sequelize = new Sequelize('', '', '', {
  dialect: 'sqlite',
  storage: join(process.cwd(), 'sqlite.db')
})