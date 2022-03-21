import { Module } from '@nestjs/common';
import { ReposModule } from './database/repos/repos.module';
import { ApiModule } from './api/api.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    ReposModule,
    ApiModule,
    RouterModule.register([
      {
        path: 'api',
        module: ApiModule,
      },
    ]),
  ],
})
export class AppModule {}
