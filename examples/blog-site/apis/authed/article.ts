import { Article } from '../../common/Article'
import { User } from '../../common/User'

export async function add(content: string) {
  let created = Article.build({
    content,
    created: new Date(),
  })
  // @ts-ignore
  created.setUser(User.build({ id: this.user.id }))
  created = await created.save()
  return created.toJSON()
}