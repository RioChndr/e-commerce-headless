import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { AuthModule } from './auth/auth.module';
import { AuthUserController } from './auth/auth-user.controller';

@Module({
  controllers: [ApiController, AuthUserController],
  imports: [AuthModule],
})
export class ApiModule {}
