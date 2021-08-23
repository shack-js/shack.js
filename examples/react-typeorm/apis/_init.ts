import "reflect-metadata"
import { connect } from "../common/db/conn"

export default async () => {
  await connect()
}