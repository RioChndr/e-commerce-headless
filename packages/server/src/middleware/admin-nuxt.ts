import { NextFunction } from 'express';
import { loadNuxt, build } from 'nuxt';

export class AdminFe {
  nuxt = null;
  prefixApi = '/api';

  async load() {
    this.nuxt = await loadNuxt('dev');
    build(this.nuxt);
  }

  middleware(req: Request, res: Response, next: NextFunction) {
    if (req.url.startsWith(this.prefixApi)) {
      next();
    } else {
      return this.nuxt.render(req, res);
    }
  }
}
