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

export class LoginEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, name: 'UserID' })
  UserID: number;

  @Column({ type: 'varchar', length: 200, name: 'Password' })
  Password: string;

  @Column({ type: 'int', unsigned: true, name: 'BlockCnt' })
  BlockCnt: number;

  @Column({ type: 'tinyint', width: 1, default: 0, name: 'IsBlock' })
  IsBlock: number;

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
