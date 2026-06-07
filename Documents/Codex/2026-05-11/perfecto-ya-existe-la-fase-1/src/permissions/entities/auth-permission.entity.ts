import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AuthRole } from '../../roles/entities/auth-role.entity';

@Entity('auth_permissions')
export class AuthPermission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 120, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 80, nullable: true })
  resource: string | null;

  @Column({ type: 'varchar', length: 80, nullable: true })
  action: string | null;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @ManyToMany(() => AuthRole, (role) => role.permissions)
  roles: AuthRole[];
}
