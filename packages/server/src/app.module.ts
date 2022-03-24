import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { RouterModule } from '@nestjs/core';
import { DatabaseModule } from './database/databaes.module';
import { RouteParent } from './route-parent';
import { AdminNuxtService } from './middleware/admin-nuxt.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    DatabaseModule,
    ApiModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', '/admin/static'),
      serveRoot: '/static',
    }),
    RouterModule.register([
      {
        path: RouteParent.server.api,
        module: ApiModule,
      },
    ]),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminNuxtService)
      .exclude(...AdminNuxtService.generateExclude())
      .forRoutes('*');
  }
}
