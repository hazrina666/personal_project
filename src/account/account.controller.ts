import {
  Controller,
  Body,
  Post,
  Get,
  Param,
  Delete,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { Account } from './account.model';
import { AccountService } from './account.service';
import {
  ICreateAccountDto,
  IUuidAccountDto,
  IUpdateAccountDto,
} from './dto/account';
import { IDeleteDto } from 'src/vehicle/dto/vehicle';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  async createAccount(
    @Body() createAccount: ICreateAccountDto,
  ): Promise<Account> {
    return this.accountService.createAccount(createAccount);
  }

  @Get('/')
  async getAccounts(): Promise<Account[]> {
    return this.accountService.getAccounts();
  }

  @Get('/:uuid')
  async getAccountById(@Param() uuid: IUuidAccountDto) {
    return this.accountService.getAccountById(uuid.uuid);
  }

  @Delete('/:uuid')
  async deleteAccount(@Param() uuid: IDeleteDto): Promise<void> {
    return this.accountService.deleteAccount(uuid.uuid);
  }

  @Put('/:uuid')
  async updateAccount(
    @Param() uuid: IUuidAccountDto,
    @Body() body: IUpdateAccountDto,
  ) {
    return this.accountService.updateAccount(uuid.uuid, body);
  }
}
