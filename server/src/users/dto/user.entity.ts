import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'User' })
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, name: 'UserID' })
  UserID: number;

  @Column({ type: 'varchar', length: 50, name: 'UserName' })
  UserName: string;

  @Column({ type: 'varchar', length: 200, nullable: true, name: 'UserEmail' })
  UserEmail: string | null;

  @Column({ type: 'tinyint', width: 1, default: 0, name: 'IsUse' })
  IsUse: number;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'CreateDate',
  })
  CreateDate: Date;

  @Column({ type: 'int', unsigned: true, name: 'CreateUserID' })
  CreateUserID: number;

  @Column({
    type: 'datetime',
    nullable: true,
    default: null,
    onUpdate: 'CURRENT_TIMESTAMP',
    name: 'UpdateDate',
  })
  UpdateDate: Date | null;

  @Column({ type: 'int', unsigned: true, nullable: true, name: 'UpdateUserID' })
  UpdateUserID: number | null;
}

@Entity({ name: 'Login' })
export class LoginEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, name: 'UserID' })
  UserID: number;

  @Column({ type: 'varchar', length: 200, name: 'Password' })
  Password: string;

  @Column({ type: 'int', unsigned: true, name: 'BlockCnt' })
  BlockCnt: number;

  @Column({ type: 'tinyint', width: 1, default: 0, name: 'IsBlock' })
  IsBlock: number;

  @Column({ type: 'varchar', length: 200, name: 'Email', nullable: true })
  Email: string | null;

  @Column({ type: 'varchar', length: 100, name: 'DisplayName', nullable: true })
  DisplayName: string | null;

  @Column({ type: 'varchar', length: 50, name: 'ProviderType', default: 'local' })
  ProviderType: string;

  @Column({ type: 'varchar', length: 200, name: 'ProviderUserID', nullable: true })
  ProviderUserID: string | null;

  @Column({ type: 'varchar', length: 255, name: 'ProfileImageUrl', nullable: true })
  ProfileImageUrl: string | null;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'CreateDate',
  })
  CreateDate: Date;

  @Column({ type: 'int', unsigned: true, name: 'CreateUserID' })
  CreateUserID: number;

  @Column({
    type: 'datetime',
    nullable: true,
    default: null,
    onUpdate: 'CURRENT_TIMESTAMP',
    name: 'UpdateDate',
  })
  UpdateDate: Date | null;

  @Column({ type: 'int', unsigned: true, nullable: true, name: 'UpdateUserID' })
  UpdateUserID: number | null;
}
