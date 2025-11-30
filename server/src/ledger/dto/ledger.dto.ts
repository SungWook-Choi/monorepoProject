import type { LedgerType } from '../ledger.entity';

export class CreateLedgerDto {
  title: string;
  category?: string;
  type: LedgerType;
  amount: number;
  occurredDate: string;
  memo?: string | null;
}

export class UpdateLedgerDto {
  title?: string;
  category?: string;
  type?: LedgerType;
  amount?: number;
  occurredDate?: string;
  memo?: string | null;
}
