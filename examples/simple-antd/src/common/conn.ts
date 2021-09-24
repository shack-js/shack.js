import { join } from "path"
import { createConnection } from "typeorm"
import { User } from "./db/User"

let conn: any = undefined

export async function connect() {
  if (!conn) conn = await createConnection({
    type: 'sqlite',
    database: join(__dirname, '..', '..', 'database.sqlite'),
    entities: [User],
    synchronize: true
  })
  return conn
}