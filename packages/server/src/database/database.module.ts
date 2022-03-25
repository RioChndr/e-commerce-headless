import { Global, Module } from '@nestjs/common';
import { DbConnectorService } from './connector/db-connector.service';
import { UserRepository } from './repos/user.repository';

@Global()
@Module({
  providers: [DbConnectorService, UserRepository],
  exports: [DbConnectorService, UserRepository],
})
export class DatabaseModule {}
