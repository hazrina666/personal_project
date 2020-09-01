import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { Branch } from './branch.model';
import { BranchService } from './branch.service';
import {
  ICreateBranchDto,
  IUpdateBranchDto,
  IUuidBranchDto,
} from './dto/branch';
@Controller('branch')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Post('/')
  async createBranch(@Body() createBranch: ICreateBranchDto): Promise<Branch> {
    return this.branchService.createBranch(createBranch);
  }

  @Get('/')
  async getBranches(): Promise<Branch[]> {
    return this.branchService.getBranches();
  }

  @Get('/:uuid')
  async getBranchesByUuid(@Param() uuid: IUuidBranchDto): Promise<Branch> {
    return this.branchService.getBranchByUuid(uuid);
  }

  @Put('/:uuid')
  async updateBranch(
    @Param() uuid: IUuidBranchDto,
    @Body() update: IUpdateBranchDto,
  ) {
    return this.branchService.updateBranch(uuid, update);
  }
}
