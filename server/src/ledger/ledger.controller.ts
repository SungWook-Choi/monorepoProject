import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { LedgerService } from './ledger.service';
import { CreateLedgerDto, UpdateLedgerDto } from './dto/ledger.dto';

@Controller('ledger')
export class LedgerController {
  constructor(private readonly ledgerService: LedgerService) {}

  @Get()
  getRange(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.ledgerService.findRange(startDate, endDate);
  }

  @Post()
  create(@Body() dto: CreateLedgerDto) {
    return this.ledgerService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateLedgerDto) {
    return this.ledgerService.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ledgerService.remove(Number(id));
  }
}
