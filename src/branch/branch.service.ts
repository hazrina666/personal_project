import { Injectable, NotFoundException } from '@nestjs/common';
import { Branch } from './branch.model';
import {
  ICreateBranchDto,
  IUpdateBranchDto,
  IUuidBranchDto,
} from './dto/branch';
import { v4 as uuidv4 } from 'uuid';
import { resolve } from 'path';
import { throwError } from 'rxjs';

@Injectable()
export class BranchService {
  private branch: Branch[] = [];

  async createBranch({
    name,
    corporateUuid,
    landingPhone,
    workshop,
  }: ICreateBranchDto): Promise<Branch> {
    return new Promise(async (resolve, reject) => {
      const uuid: string = uuidv4();

      const branch: Branch = new Branch();
      branch.uuid = uuid;
      branch.name = name;
      branch.corporateUuid = corporateUuid;
      branch.landingPhone = landingPhone;
      branch.workshop = workshop;

      let branchValidation: (name: string) => void;

      branchValidation = name => {
        const findBranch = this.branch.find(branch => branch.name === name);
        if (!findBranch) {
          const branch = this.branch.push;
          return resolve(branch);
        } else {
          return reject('branch already exist');
        }
      };

      branchValidation(name);
    })
      .then(branch => {
        return resolve('branch created') + branch;
      })
      .catch(error => error);
  }

  async getBranches(): Promise<Branch[]> {
    return this.branch;
  }

  async getBranchByUuid(uuid: IUuidBranchDto): Promise<Branch> {
    return new Promise((resolve, reject) => {
      const findBranch = this.branch.find(branch => branch.uuid === uuid.uuid);
      if (!findBranch) {
        return reject(`branch with  "${uuid}" not found`);
      } else {
        return resolve(findBranch);
      }
    });
  }

  async updateBranch(uuid: IUuidBranchDto, update: IUpdateBranchDto) {
    return new Promise(async (resolve, reject) => {
      const findBranch = await this.getBranchByUuid(uuid);
      const updateFindBranch =
        findBranch.name ||
        findBranch.corporateUuid ||
        findBranch.landingPhone ||
        findBranch.workshop;
      if (updateFindBranch) {
        return resolve(
          'account updated' +
            ((findBranch.name = update.name),
            (findBranch.corporateUuid = update.corporateUuid),
            (findBranch.landingPhone = update.landingPhone),
            (findBranch.workshop = update.workshop)),
        );
      }
      if (!updateFindBranch) {
        return reject(throwError);
      }
    }).then(updateBranch => {
      return { ...this.branch };
    });
  }
}

//promises & async await
// a promise can be pending, fulfilled or rejected
// async await are extensions on promises
// using async implies a promise will be returned
// await operator is used to wait for a promises, makes javascript wait until
// promise returns a result
