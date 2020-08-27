import { Injectable, NotFoundException } from '@nestjs/common';
import { Branch } from './branch.model';
import {
  ICreateBranchDto,
  IUpdateBranchDto,
  IUuidBranchDto,
} from './dto/branch';
import { v4 as uuidv4 } from 'uuid';
import { resolve } from 'path';

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

      const branchValidation = (name: string) => {
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
    const findBranch = this.branch.find(branch => branch.uuid === uuid.uuid);
    if (!findBranch) {
      throw new NotFoundException(`branch with  "${uuid}" not found`);
    } else {
      return findBranch;
    }
  }

  async updateBranch(
    uuid: IUuidBranchDto,
    update: IUpdateBranchDto,
  ): Promise<Branch> {
    const findBranch = await this.getBranchByUuid(uuid);
    if (findBranch.name) {
      findBranch.name = update.name;
    }
    if (findBranch.corporateUuid) {
      findBranch.corporateUuid = update.corporateUuid;
    }
    if (findBranch.landingPhone) {
      findBranch.landingPhone = update.landingPhone;
    }
    if (findBranch.workshop) {
      findBranch.workshop = update.workshop;
    }

    return findBranch;
  }
}

//promises & async await
// a promise can be pending, fulfilled or rejected
// async await are extensions on promises
// using async implies a promise will be returned
// await operator is used to wait for a promises, makes javascript wait until
// promise returns a result
