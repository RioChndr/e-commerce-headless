import {
  Injectable,
  NestMiddleware,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { loadNuxt, build } from 'nuxt';
import { AppConfig } from 'src/config/app.config';
import { RouteParent } from 'src/route-parent';

@Injectable()
export class AdminNuxtService
  implements NestMiddleware, OnModuleInit, OnApplicationShutdown
{
  nuxt = null;

  onApplicationShutdown(signal?: string) {
    console.log(`Shutdown ${signal}`);
    if (this.nuxt) {
      this.nuxt.close();
    }
  }
  async onModuleInit() {
    if (!AppConfig.runWithAdmin) return;
    const isDev = process.env.NODE_ENV !== 'production';
    if (!this.nuxt) {
      this.nuxt = await loadNuxt(isDev ? 'dev' : 'start');
    }
    if (isDev) {
      build(this.nuxt);
    }
  }

  use(req: Request, res: any, next: (error?: any) => void) {
    this.nuxt.render(req, res);
  }

  isNotAdmin(url: string): boolean {
    const listPrefix = Object.values(RouteParent.server);
    return listPrefix.some((prefix) => url.startsWith(prefix));
  }

  static generateExclude() {
    const listPrefix = Object.values(RouteParent.server);
    return listPrefix.map((prefix) => `${prefix}/(.*)`);
  }
}
