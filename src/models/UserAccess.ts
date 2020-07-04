import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tb_users_access')
class UserAccess {
  @PrimaryGeneratedColumn({ type: 'uuid', name: 'user_id' })
  userId: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UserAccess;
