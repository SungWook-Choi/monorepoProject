import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'LoginHistory' })
export class LoginHistoryEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
    name: 'LoginHistoryID',
  })
  LoginHistoryID: number;

  @Column({ type: 'int', unsigned: true, name: 'UserID' })
  UserID: number;

  @Column({ type: 'varchar', length: 50, name: 'ProviderType' })
  ProviderType: string;

  @Column({ type: 'varchar', length: 200, name: 'Email', nullable: true })
  Email: string | null;

  @Column({ type: 'varchar', length: 255, name: 'UserAgent', nullable: true })
  UserAgent: string | null;

  @CreateDateColumn({ type: 'datetime', name: 'LoginAt' })
  LoginAt: Date;
}
