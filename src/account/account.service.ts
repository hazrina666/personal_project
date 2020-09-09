import { Injectable, Param, NotFoundException } from '@nestjs/common';
import { ICreateAccountDto, IUpdateAccountDto } from './dto/account';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccountSchema } from './schemas/account.schema';
import { Account } from './account.model';

@Injectable()
export class AccountService {
  // constructor(
  //   @InjectModel('Account') private readonly accountModel: Model<AccountSchema>,
  // ) {}

  private account: Account[] = [];

  async createAccount({
    username,
    password,
    email,
    phone,
    product,
  }: ICreateAccountDto): Promise<Account> {
    return new Promise((resolve, reject) => {
      const uuid: string = uuidv4();

      const account = {} as Account;
      account.uuid = uuid;
      account.username = username.trim();
      account.email = email;
      account.phone = phone;
      account.password = password;
      account.product = product;

      let mandatoryFields: (account: ICreateAccountDto) => void;
      // let accountValidation: (
      //   username: string,
      //   password: string,
      //   cb: (phone: number) => number,
      // ) => void;

      let accountValidation: (username: string, password: string) => void;
      let passwordValidation: (password: string) => void;
      let emailValidation: (email: string) => void;

      mandatoryFields = account => {
        const field = { username, email, password, product, phone };
        if (field.username == '') {
          return reject('username please');
        }
        if (field.email == '') {
          return reject('email please');
        }
        if (field.password == '') {
          return reject('password please');
        }
        if (field.product == '') {
          return reject('product please');
        }
        if (field.phone == null) {
          return reject('phone please');
        }
      };

      accountValidation = (username, password) => {
        const findAccount = this.account.find(
          account =>
            account.username === username && account.password === password,
        );
        if (findAccount) {
          return reject('account already exist');
        } else {
          this.account.push(account);
          return resolve({ ...account });
        }
      };

      passwordValidation = password => {
        var letter = /[a-z]/;
        var upper = /[A-Z]/;
        var number = /[0-9]/;
        if (
          password.length < 6 ||
          !letter.test(password) ||
          !upper.test(password) ||
          !number.test(password)
        ) {
          return reject(
            'please make sure your password is longer than 6 characters, has lowercase, uppercase letter and includes numbers',
          );
        }
        if (!letter.test(password)) {
          return reject(
            'please make sure your password includes a lowercase letter',
          );
        }
        if (!upper.test(password)) {
          return reject(
            'please make sure your password includes an uppercase letter',
          );
        }
        if (!number.test(password)) {
          return reject('please make sure your password includes a digit');
        }
      };

      emailValidation = email => {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!regex.test(email)) {
          return reject('invalid email.try again');
        } else {
          return resolve(email);
        }
      };

      mandatoryFields(account);
      passwordValidation(password);
      accountValidation(username, password);
      emailValidation(email);
    })
      .then(account => {
        return { account };
      })
      .catch(error => error);
  }

  async getAccounts(): Promise<Account[]> {
    return this.account;
  }

  async getAccountById(uuid: string): Promise<Account> {
    const found = await this.account.find(account => account.uuid === uuid);
    return new Promise((resolve, reject) => {
      if (found) {
        return resolve(found);
      } else {
        return reject('error');
      }
    });
  }

  async deleteAccount(uuid: string): Promise<void> {
    const found = await this.getAccountById(uuid);
    this.account.filter(account => account.uuid !== found.uuid);
  }

  async updateAccount(uuid: string, body: IUpdateAccountDto) {
    const found = await this.getAccountById(uuid);
    return new Promise((resolve, reject) => {
      if (
        found.username ||
        found.password ||
        found.email ||
        found.phone ||
        found.product
      ) {
        return resolve(
          'account updated' +
            ((found.username = body.username),
            (found.password = body.password),
            (found.email = body.email),
            (found.phone = body.phone),
            (found.product = body.product)),
        );
      } else {
        reject('account cannot be updated');
      }
    })
      .then(updateAccount => {
        return { ...found };
      })
      .catch(error => {
        console.log(error);
      });
  }
}

//https://gist.github.com/HarishChaudhari/0dd5514ce430991a1b1b8fa04e8b72a4#file-passwordregex-js
