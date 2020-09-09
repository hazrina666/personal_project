import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { MongooseModule, InjectModel } from '@nestjs/mongoose';
import { AccountSchema } from './schemas/account.schema';

@Module({
  imports: [
    // MongooseModule.forFeature([{ name: 'Account', schema: AccountSchema }]),
  ],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
