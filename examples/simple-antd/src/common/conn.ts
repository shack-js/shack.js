import { join } from "path"
import { createConnection } from "typeorm"
import { TodoItem } from "./db/TodoItem"

let conn: any = undefined

export async function connect() {
  if (!conn) conn = await createConnection({
    type: 'sqlite',
    database: join(__dirname, '..', '..', 'database.sqlite'),
    entities: [TodoItem],
    synchronize: true
  })
  return conn
}