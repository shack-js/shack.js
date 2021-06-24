import { Article } from '../common/Article'
import { User } from '../common/User'
import { Op } from 'sequelize'

export const list = async (before: string = new Date().toJSON()) => {
  let data = await Article.findAll({
    where: {
      created: {
        [Op.lt]: before
      }
    },
    order: [['created', 'desc']],
    limit: 10,
    include: [{
      model: User,
      required: true,
    }],
    raw: true
  })
  return data
  // return data.map(x => x.toJSON())
}