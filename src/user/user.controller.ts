import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto, IUserUuid, updateUserDto } from './user';
import { UpdateDateColumn } from 'typeorm';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/')
  createUser(@Body() createUser: createUserDto) {
    return this.userService.createUser(createUser);
  }

  @Get('/')
  getUser() {
    return this.userService.getUser();
  }

  @Get('/:uuid')
  getUserByUuid(@Param() dto: IUserUuid) {
    return this.userService.getUserByUuid(dto);
  }

  @Put('/:uuid')
  updateUser(@Param() dto: IUserUuid, @Body() update: updateUserDto) {
    return this.userService.updateUser(dto, update);
  }
}
