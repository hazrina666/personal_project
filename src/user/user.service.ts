import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { createUserDto, IUserUuid, updateUserDto } from './user';
import { User } from './user.model';

@Injectable()
export class UserService {
  private user: User[] = [];

  createUser(dto: createUserDto) {
    const { username, password, email, bio } = dto;
    const uuid: string = uuidv4();
    const newUser = new User();
    newUser.uuid = uuid;
    newUser.bio = bio;
    newUser.username = username;
    newUser.password = password;
    newUser.email = email;
    newUser.bio = bio;

    this.user.push(newUser);
    return newUser;
  }

  getUser() {
    return this.user;
  }

  getUserByUuid(dto: IUserUuid): User {
    return this.user.find(user => user.uuid === dto.uuid);
  }

  updateUser(dto: IUserUuid, update: updateUserDto) {
    const { uuid } = dto;
    const findUser = this.getUserByUuid({ uuid });

    if (findUser) {
      let updated = Object.assign(dto, update);
      return { ...updated };
    } else {
      throw new Error();
    }
  }
}
