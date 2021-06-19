import SequelizeModule from 'sequelize'
import { TODO_TEXT_LENGTH } from './consts.mjs'

const { Sequelize, DataTypes } = SequelizeModule
const sequelize = new Sequelize('sqlite::memory:')

export const Todo = sequelize.define('Todo', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  checked: {
    type: DataTypes.BOOLEAN
  },
  text: {
    type: DataTypes.STRING(TODO_TEXT_LENGTH)
  }
})

export const initSequelize = sequelize.sync()