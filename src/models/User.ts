import { hash } from 'bcryptjs'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  AfterLoad,
  AfterInsert
} from 'typeorm'

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @AfterLoad()
  @AfterInsert()
  hiddenPassword () {
    delete this.password
  }

  @BeforeInsert()
  async hashPassword () {
    this.password = await hash(this.password, 8)
  }
}

export default User
