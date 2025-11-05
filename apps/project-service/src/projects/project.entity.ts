import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({ type: 'text', nullable: true })
  description: string

  @Column({ name: 'owner_id' })
  ownerId: string

  @Column({ default: 'private' })
  visibility: string

  @Column({ default: 'active' })
  status: string

  @Column({ nullable: true })
  thumbnail_url: string

  @Column('text', { array: true, default: [] })
  tags: string[]

  @Column('text', { array: true, default: [] })
  tech_stack: string[]

  @Column({ default: 0 })
  star_count: number

  @Column({ default: 0 })
  fork_count: number

  @Column({ default: 0 })
  view_count: number

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @Column({ type: 'timestamp', nullable: true })
  archived_at: Date
}
