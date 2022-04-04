import { RouteParent } from 'src/route-parent';
import { AdminNuxtService } from './admin-nuxt.service';

describe('Test admin-nuxt.service.ts', () => {
  describe('Test isNotAdmin function', () => {
    const adminNuxtService = new AdminNuxtService();

    const testUrlAdmin = (url: string) => {
      it(`Test ${url} should be admin url`, () => {
        expect(adminNuxtService.isNotAdmin(url)).toBeFalsy();
      });
    };
    const testUrlNotAdmin = (url: string) => {
      it(`Test ${url} should not admin url`, () => {
        expect(adminNuxtService.isNotAdmin(url)).toBeTruthy();
      });
    };

    testUrlAdmin(RouteParent.admin + '/test');
    testUrlAdmin(RouteParent.admin + '/foo/bar');
    testUrlNotAdmin(RouteParent.server.api + '/test');
    testUrlNotAdmin(RouteParent.server.swagger + '/foo/bar');
    testUrlNotAdmin(RouteParent.server.static + '/test');
  });

  describe('Test generateExclude function', () => {
    it('Test should return array', () => {
      expect(Array.isArray(AdminNuxtService.generateExclude())).toBeTruthy();
    });

    it('Test should return array with length', () => {
      const length = Object.values(RouteParent.server).length;
      expect(AdminNuxtService.generateExclude().length).toBe(length);
    });
  });
});
