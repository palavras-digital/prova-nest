import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { Auth } from './auth.entity';
import { AuthLoginDto } from './dto/auth-login.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(authLoginDto: AuthLoginDto) {
    const user = await this.validateUser(authLoginDto);

    const payload = {
      userId: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(authLoginDto: AuthLoginDto): Promise<Auth> {
    const { username, password } = authLoginDto;

    const auth = await this.validateUsername(username);
    if (!(await this.validatePassword(password, auth.password))) {
      throw new UnauthorizedException();
    }

    return auth;
  }

  async validateUsername(username: string): Promise<Auth> {
    const USER_NAME_VALID = 'admin';
    if (username === USER_NAME_VALID) {
      const userAuth: Auth = {
        id: 1,
        username: 'adm@gmail.com',
        password:
          '$2a$12$4dxlQEZusDQY8pkhSqr/neku69pmLkH5/jwnTNkXstGx6ziGul6tO',
      };

      return userAuth;
    }
  }

  async validatePassword(password: string, passwordFound): Promise<boolean> {
    return await bcrypt.compare(password, passwordFound);
  }
}
