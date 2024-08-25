import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  ObjectIdColumn,
  ObjectId,
} from 'typeorm';

@Entity('tasks')
export class Task {
  @ObjectIdColumn()
  _id: ObjectId;
  @Column()
  description: string;
  @Column({ default: false })
  completed: boolean;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
