import { INTEGER, DATE, TEXT } from "sequelize";
import { sequelize } from "./sequelize";
import { User } from "./User";

export const Article = sequelize.define('Article', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  created: {
    type: DATE
  },
  content: {
    type: TEXT
  }
})
