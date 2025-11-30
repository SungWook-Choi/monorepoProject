import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export type LedgerType = 'income' | 'expense';

@Entity({ name: 'LedgerEntry' })
export class LedgerEntryEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
    name: 'LedgerEntryID',
  })
  LedgerEntryID: number;

  @Column({ type: 'varchar', length: 150, name: 'Title' })
  Title: string;

  @Column({ type: 'varchar', length: 80, name: 'Category', default: '기타' })
  Category: string;

  @Column({ type: 'varchar', length: 10, name: 'Type', default: 'expense' })
  Type: LedgerType;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    name: 'Amount',
    transformer: {
      to: (value: number) => value,
      from: (value: string | null) => (value === null ? 0 : Number(value)),
    },
  })
  Amount: number;

  @Column({ type: 'date', name: 'OccurredDate' })
  OccurredDate: string;

  @Column({ type: 'text', name: 'Memo', nullable: true })
  Memo: string | null;

  @CreateDateColumn({ type: 'datetime', name: 'CreateDate' })
  CreateDate: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'UpdateDate' })
  UpdateDate: Date;
}
