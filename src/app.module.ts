import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehicleController } from './vehicle/vehicle.controller';
import { VehicleService } from './vehicle/vehicle.service';
import { VehicleModule } from './vehicle/vehicle.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountService } from './account/account.service';
import { AccountController } from './account/account.controller';
import { AccountModule } from './account/account.module';
import { BranchController } from './branch/branch.controller';
import { BranchService } from './branch/branch.service';
import { BranchModule } from './branch/branch.module';
@Module({
  imports: [
    VehicleModule,
    AccountModule,
    BranchModule,
    AccountModule,

    MongooseModule.forRoot(
      'mongodb+srv://rina123456:rina123456@cluster0.icqqs.mongodb.net/<dbname>?retryWrites=true&w=majority',
    ),
  ],
  controllers: [
    AppController,
    VehicleController,
    AccountController,
    BranchController,
    AccountController,
  ],
  providers: [AppService, VehicleService, AccountService, BranchService],
})
export class AppModule {}

//1.make a config file for db URI
//2.import in app module
//3.create a schema
//4.add schema to module
