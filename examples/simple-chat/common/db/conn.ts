import { join } from "path"
import { createConnection } from "typeorm"
import { Message } from "./Message"
// import { TodoItem } from "./TodoItem"

let conn: any = undefined

export async function connect() {
  if (!conn) conn = await createConnection({
    type: 'sqlite',
    database: join(__dirname, '..', '..', 'database.sqlite'),
    entities: [Message],
    synchronize: true
  })
  return conn
}