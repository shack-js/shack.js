import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class TodoItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  text: string

  @Column()
  checked: boolean
}
