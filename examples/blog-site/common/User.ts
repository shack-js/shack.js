import { INTEGER, STRING } from "sequelize";
import { sequelize } from "./sequelize";

export const User = sequelize.define('User', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  account: {
    type: STRING(32),
    unique: true
  },
  pass: {
    type: STRING(32)
  }
})

export const SECRET = '123456'