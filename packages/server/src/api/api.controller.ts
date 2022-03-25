import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RoleOnlyAdmin } from 'src/decorators/Role.decorator';
import { AuthGuard } from './auth/authrorization/authorization.guard';

@Controller()
export class ApiController {
  @Get('test/api')
  getTestApi() {
    return 'Hello world 123';
  }

  @ApiBearerAuth()
  @RoleOnlyAdmin()
  @UseGuards(AuthGuard)
  @Get('secret')
  secret(@Req() request: any) {
    return `secreet, hello ${JSON.stringify(request.user)}`;
  }
}
