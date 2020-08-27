import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import {
  ICreateVehicleDto,
  IUpdateVehicleDto,
  IDeleteDto,
} from './dto/vehicle';
import { Vehicle } from './vehicle.model';
import { response } from 'express';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {} //used to make a property as read-only. Read-only members can be accessed outside the class, but their value cannot be changed

  @Post()
  async createVehicle(
    @Body() ICreateVehicleDto: ICreateVehicleDto,
    @Res() response,
  ): Promise<Vehicle> {
    return this.vehicleService.createVehicle(ICreateVehicleDto);
  }

  @Get()
  getVehicle(): Vehicle[] {
    return this.vehicleService.getVehicle();
  }

  @Get('/:uuid')
  getVehicleByUuid(@Param('uuid') uuid: string): Vehicle {
    return this.vehicleService.getVehicleByUuid(uuid);
  }

  // @Put('/update/:uuid')
  // updateVehicle(
  //   @Param() uuid: string,
  //   @Body() updateVehicleDto: IUpdateVehicleDto,
  // ): Promise<Vehicle> {
  //   return this.vehicleService.updateVehicle(uuid, updateVehicleDto);
  // }

  @Delete('/delete/:uuid')
  deleteVehicle(@Param() IDeleteDto: IDeleteDto): void {
    return this.vehicleService.deleteVehicle(IDeleteDto);
  }
}
