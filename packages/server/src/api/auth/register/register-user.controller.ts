import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { UserCred } from 'src/database/repos/user.repository';
import { AuthService } from '../auth.service';
import { RegisterUserService } from './register-user.service';

@Controller('auth-user')
export class RegisterUserController {
  constructor(
    private registerUserService: RegisterUserService,
    private authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() body: UserCred) {
    try {
      const user = await this.registerUserService.register(body);
      const token = await this.authService.login(user);
      return token;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
