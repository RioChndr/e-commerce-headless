import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { AdminFe } from './middleware/admin-nuxt';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const admin = new AdminFe();
  await admin.load();

  app.use((req, res, next) => admin.middleware(req, res, next));

  await app.listen(3000);
}
bootstrap();
