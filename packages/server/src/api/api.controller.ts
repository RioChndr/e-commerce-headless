import { Controller, Get } from '@nestjs/common';

@Controller()
export class ApiController {
  @Get('test/api')
  getTestApi() {
    return 'Hello world';
  }
}
