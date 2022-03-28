import { Test } from '@nestjs/testing';
import { DatabaseModule } from '../database.module';
import { TokenVerifyRepository } from './token-verify.repository';

describe('Test token-verify.repository.ts', () => {
  let tokenVerifyRepository: TokenVerifyRepository;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [TokenVerifyRepository],
    }).compile();

    tokenVerifyRepository = moduleRef.get<TokenVerifyRepository>(
      TokenVerifyRepository,
    );
  });

  it('model not null', () => {
    expect(tokenVerifyRepository.model()).not.toBeNull();
  });

  describe('Expired time', () => {
    it('expired time is not null', () => {
      expect(tokenVerifyRepository.getExpiredTime()).not.toBeNull();
    });
    it('expired time is time', () => {
      expect(tokenVerifyRepository.getExpiredTime()).toBeInstanceOf(Date);
    });
    it('test expired time', () => {
      const timeout = tokenVerifyRepository.getExpiredTime();
      expect(tokenVerifyRepository.isNotExpired(timeout)).toBeTruthy();
    });
    it('test expired time false', () => {
      const timeout = new Date(new Date().getTime() - 1000 * 60 * 2);
      expect(tokenVerifyRepository.isNotExpired(timeout)).toBeFalsy();
    });
  });
});
