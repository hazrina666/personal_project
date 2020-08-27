import { Injectable, HttpException, NotFoundException } from '@nestjs/common';
import {
  ICreateVehicleDto,
  IUpdateVehicleDto,
  IDeleteDto,
} from './dto/vehicle';
import { v4 as uuidv4 } from 'uuid';
import { Vehicle } from './vehicle.model';

@Injectable()
export class VehicleService {
  private vehicle: Vehicle[] = [];

  createVehicle({
    name,
    numberPlate,
    brand,
    model,
    price,
  }: ICreateVehicleDto): Vehicle {
    //destructuring dto
    const uuid: string = uuidv4();
    const vehicle: Vehicle = {
      //creating a new object of type Vehicle called vehicle and it has all these properties
      uuid,
      name,
      numberPlate,
      brand,
      model,
      price,
    };

    this.vehicle.push(vehicle);
    return vehicle;
  }

  getVehicle(): Vehicle[] {
    return this.vehicle;
  }

  getVehicleByUuid(uuid: string): Vehicle {
    return this.vehicle.find(vehicle => uuid === vehicle.uuid);
  }

  // updateVehicle(uuid: string, update: IUpdateVehicleDto): {
  //   const promise = new Promise((resolve, reject) => {
  //     const findVehicle = this.getVehicleByUuid(uuid);

  //     if (findVehicle.name) {
  //       findVehicle.name = update.name;
  //     }
  //     if (findVehicle.numberPlate) {
  //       findVehicle.numberPlate = update.numberPlate;
  //     }
  //     if (findVehicle.brand) {
  //       findVehicle.brand = update.brand;
  //     }
  //     if (findVehicle.model) {
  //       findVehicle.model = update.model;
  //     }
  //     if (findVehicle.price) {
  //       findVehicle.price = update.price;
  //     }
  //     return findVehicle;
  //   });

  //   promise
  //     .then(findVehicle => {
  //       console.log('vehicle updated' + { findVehicle });
  //     })
  //     .catch(error => {
  //       throw new NotFoundException('failed to update ' + error);
  //     });
  // }

  // deleteVehicle({ uuid }: IDeleteDto): void {
  //   //returns nothing
  //   this.vehicle = this.vehicle.filter(vehicle => vehicle.uuid !== uuid);
  // }

  deleteVehicle({ uuid }: IDeleteDto): void {
    let promise = new Promise((resolve, reject) => {
      this.vehicle = this.vehicle.filter(vehicle => vehicle.uuid !== uuid); //executor
    });

    promise
      .then(vehicle => {
        //consumer
        console.log('successful' + vehicle);
      })
      .catch(error => {
        throw new NotFoundException('failed to delete ' + error);
      });

    //returns nothing
  }

  // promises in javascript
  // - a producing code/or executor is a function that is passed to new Promise.
  // - arguments(resolve,reject) are callbacks provided by js
  // - when executor obtains result, it should be resolve/reject
  // - resolve(value) - if job finished successfully with result value
  // - rejects(error) - if error rejects, error is the error object
  //

  //make one for branch and account
}
