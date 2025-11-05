import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm'
import * as bcrypt from 'bcrypt'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  email: string

  @Column({ unique: true })
  username: string

  @Column({ nullable: true })
  password_hash: string

  @Column({ nullable: true })
  full_name: string

  @Column({ type: 'text', nullable: true })
  bio: string

  @Column({ nullable: true })
  avatar_url: string

  @Column({ nullable: true })
  orcid: string

  @Column({ nullable: true })
  google_scholar_id: string

  @Column({ nullable: true })
  github_username: string

  @Column({ nullable: true })
  twitter_username: string

  @Column({ nullable: true })
  institution: string

  @Column({ nullable: true })
  position: string

  @Column('text', { array: true, default: [] })
  research_interests: string[]

  @Column('text', { array: true, default: [] })
  skills: string[]

  @Column({ default: false })
  email_verified: boolean

  @Column({ default: true })
  is_active: boolean

  @Column({ default: 'user' })
  role: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @Column({ type: 'timestamp', nullable: true })
  last_login_at: Date

  @BeforeInsert()
  async hashPassword() {
    if (this.password_hash) {
      this.password_hash = await bcrypt.hash(this.password_hash, 12)
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password_hash)
  }
}
