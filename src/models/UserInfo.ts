import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity('tb_users_info')
class UserInfo {
  @PrimaryColumn({ type: 'uuid', name: 'user_access_id' })
  userAccessId: string;

  @Column({ type: 'varchar', name: 'first_name' })
  firstName: string;

  @Column({ type: 'varchar', name: 'last_name' })
  lastName: string;

  @Column({ type: 'text', name: 'description' })
  description: string;

  @Column({ type: 'varchar', name: 'avatar' })
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UserInfo;
