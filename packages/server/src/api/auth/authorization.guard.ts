import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UserRepository } from 'src/database/repos/user.repository';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private userRepository: UserRepository) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers?.authorization ?? null;
    if (!token) return false;
    if (token.split(' ').length < 2) return false;

    const bearerToken = token.split(' ')[1];

    const user = await this.validateToken(bearerToken);
    if (!user) return false;

    // Add data user at request
    request.user = user;
    return true;
  }

  async validateToken(token: string) {
    try {
      const isValid = jwt.verify(token, process.env.SECRET_JWT);
      if (!isValid) return false;
      const decodeToken = jwt.decode(token, { json: true });

      if (!decodeToken.uid) return false;
      const user = await this.userRepository.findUser(decodeToken.uid);
      if (!user) return false;

      return user;
    } catch {
      return false;
    }
  }
}
