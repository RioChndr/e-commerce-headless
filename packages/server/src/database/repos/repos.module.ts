import { Module } from '@nestjs/common';
import { ReposService } from './repos.service';

@Module({
  providers: [ReposService],
})
export class ReposModule {}
