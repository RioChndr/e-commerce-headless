import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/databaes.module';
import { AuthAdminController } from './auth-admin.controller';
import { AuthUserController } from './auth-user.controller';
import { AuthService } from './auth.service';
import { RegisterUserController } from './register/register-user.controller';
import { RegisterUserService } from './register/register-user.service';

@Module({
  imports: [DatabaseModule],
  controllers: [
    AuthAdminController,
    AuthUserController,
    RegisterUserController,
  ],
  providers: [AuthService, RegisterUserService],
  exports: [AuthService],
})
export class AuthModule {}
