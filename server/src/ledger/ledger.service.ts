import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindOptionsWhere, Repository } from 'typeorm';
import { LedgerEntryEntity } from './ledger.entity';
import { CreateLedgerDto, UpdateLedgerDto } from './dto/ledger.dto';

@Injectable()
export class LedgerService {
  constructor(
    @InjectRepository(LedgerEntryEntity)
    private readonly ledgerRepository: Repository<LedgerEntryEntity>,
  ) {}

  async findRange(startDate?: string, endDate?: string) {
    const [start, end] = this.normalizeRange(startDate, endDate);
    const where: FindOptionsWhere<LedgerEntryEntity> = {
      OccurredDate: Between(start, end),
    };
    return this.ledgerRepository.find({
      where,
      order: { OccurredDate: 'ASC', LedgerEntryID: 'DESC' },
    });
  }

  async create(dto: CreateLedgerDto) {
    const entry = this.ledgerRepository.create({
      Title: dto.title,
      Category: dto.category ?? '기타',
      Type: dto.type,
      Amount: dto.amount,
      OccurredDate: this.normalizeDate(dto.occurredDate),
      Memo: dto.memo ?? null,
    });
    return this.ledgerRepository.save(entry);
  }

  async update(id: number, dto: UpdateLedgerDto) {
    const entry = await this.ledgerRepository.findOne({
      where: { LedgerEntryID: id },
    });

    if (!entry) {
      throw new NotFoundException('해당 가계부 내역을 찾을 수 없습니다.');
    }

    if (dto.title !== undefined) entry.Title = dto.title;
    if (dto.category !== undefined) entry.Category = dto.category;
    if (dto.type !== undefined) entry.Type = dto.type;
    if (dto.amount !== undefined) entry.Amount = dto.amount;
    if (dto.occurredDate !== undefined)
      entry.OccurredDate = this.normalizeDate(dto.occurredDate);
    if (dto.memo !== undefined) entry.Memo = dto.memo;

    return this.ledgerRepository.save(entry);
  }

  async remove(id: number) {
    const result = await this.ledgerRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException('삭제할 데이터가 없습니다.');
    }
    return { ok: true };
  }

  private normalizeRange(
    startDate?: string,
    endDate?: string,
  ): [string, string] {
    if (startDate && endDate) {
      return [this.normalizeDate(startDate), this.normalizeDate(endDate)];
    }

    const today = new Date();
    const first = new Date(today.getFullYear(), today.getMonth(), 1);
    const last = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    return [this.normalizeDate(first), this.normalizeDate(last)];
  }

  private normalizeDate(input: string | Date) {
    const date = typeof input === 'string' ? new Date(input) : input;
    if (Number.isNaN(date.getTime())) {
      throw new Error('유효하지 않은 날짜 형식입니다.');
    }
    const offsetDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000,
    );
    return offsetDate.toISOString().slice(0, 10);
  }
}
