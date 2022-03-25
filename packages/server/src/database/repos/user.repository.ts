import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, User } from '@prisma/client';
import { DbConnectorService } from '../connector/db-connector.service';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';
import { UserWithAdminRole } from './type/user.type';

@Injectable()
export class UserRepository {
  constructor(private dbService: DbConnectorService) {}

  user() {
    return this.dbService.user;
  }

  hideCred(user: UserWithAdminRole | User) {
    delete user.password;
  }

  async register(user: Prisma.UserCreateInput) {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, bcrypt.genSaltSync());
    }
    const resultCreate = await this.user().create({
      data: user,
    });
    this.hideCred(resultCreate);

    return resultCreate;
  }

  async login(userCred: UserCred) {
    const { email, password } = userCred;
    if (!email || !password) throw 'Credential is empty';

    const user = await this.user().findUnique({
      where: {
        email,
      },
    });
    if (!user) throw new UserNotFoundException();

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new PasswordNotMatchException();
    this.hideCred(user);

    return user;
  }

  async findUser(id: string) {
    const user = await this.user().findUnique({
      where: {
        id,
      },
      include: {
        adminUser: true,
      },
    });
    if (!user) throw new UserNotFoundException();

    this.hideCred(user);
    return user;
  }
}

export class UserNotFoundException extends Error {
  name = 'UserNotFoundException';
  message = 'User not found';
}

export class PasswordNotMatchException extends Error {
  name = 'PasswordNotMatchException';
  message = 'Password are not correct';
}

// DTO user credential
export class UserCred {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
