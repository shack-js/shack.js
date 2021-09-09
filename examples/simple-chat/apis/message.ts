import { IMessage } from "../common/consts"
import { Message } from "../common/db/Message"

export const getLeftUserAndMsgCounts = async (toid: number) => {
  return await Message.createQueryBuilder()
    .select(['fromid', 'count(1) as msgcnt'])
    .where({ read: 0, toid })
    .groupBy('fromid')
    .getRawMany() as { fromid: number, msgcnt: number }[]
}

export const getUnreadMsgs = async (fromid: number, toid: number) => {
  let cre = { read: 0, fromid, toid }
  let rtn = await Message.find({ where: cre, order: { created: 1 } })
  await Message.update(cre, { read: new Date().getTime() })
  return rtn
}

export const sendMsg = async (obj: IMessage) => {
  return await Message.insert(obj)
}