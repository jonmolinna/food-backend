import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(email: string, password: string): Promise<any> {
    console.log('LOCAL STATRATEGY');
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      console.log('NO USER');
      throw new UnauthorizedException();
    }
    return user;
  }
}
