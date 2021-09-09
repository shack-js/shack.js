import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import { IMessage } from "../consts"


@Entity()
export class Message extends BaseEntity implements IMessage {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "smallint" })
  type: number

  @Column({ type: 'text' })
  content: string

  @Column({ type: 'int' })
  read: number

  @Column({ type: 'int' })
  fromid: number

  @Column({ type: 'int' })
  toid: number

  @Column({ type: 'int' })
  created: number
}