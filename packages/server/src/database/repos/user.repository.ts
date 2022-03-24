import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { DbConnectorService } from '../connector/db-connector.service';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';

@Injectable()
export class UserRepository {
  constructor(private dbService: DbConnectorService) {}

  user() {
    return this.dbService.user;
  }

  hideCred(user: User) {
    delete user.password;
    return user;
  }

  async register(user: Prisma.UserCreateInput) {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, bcrypt.genSaltSync());
    }
    const resultCreate = await this.user().create({
      data: user,
    });
    return this.hideCred(resultCreate);
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
    return this.hideCred(user);
  }

  async findUser(id: string) {
    const user = await this.user().findUnique({
      where: {
        id,
      },
    });
    if (!user) throw new UserNotFoundException();

    return this.hideCred(user);
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

export class UserCred {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
