import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users')
class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string
}

export default User
