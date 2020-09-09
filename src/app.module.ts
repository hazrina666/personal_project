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
import { Connection } from 'typeorm';
import config from './config/keys';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    VehicleModule,
    AccountModule,
    BranchModule,
    AccountModule,

    // MongooseModule.forRoot(config.mongoURI),

    UserModule,
  ],
  controllers: [
    AppController,
    VehicleController,
    AccountController,
    BranchController,
    AccountController,
    UserController,
  ],
  providers: [
    AppService,
    VehicleService,
    AccountService,
    BranchService,
    UserService,
  ],
})
export class AppModule {}

//1.make a config file for db URI
//2.import in app module
//3.create a schema
//4.add schema to module
