
export interface IMessage {
  id?: number
  type: number
  content: string
  read: number
  fromid: number
  toid: number
  created: number
}


export const MessageTypes = {
  text: 0,
  image: 1,
  video: 2,
  file: 3,
}

export class User {
  id: number
  name: string

  constructor(
    id: number,
    name: string
  ) {
    this.id = id
    this.name = name
  }
}

export const users: { [key: number]: User } = {
  1: new User(1, 'admin'),
  2: new User(2, 'abc'),
  3: new User(3, 'def'),
}

export function getFileType(filename: string) {
  let lower = filename.toLowerCase()
  if (/\.(svg|jpe?g|png|gif)$/.test(lower)) return MessageTypes.image
  if (/\.(mp4|webm|ogg)$/.test(lower)) return MessageTypes.video
  return MessageTypes.file
}