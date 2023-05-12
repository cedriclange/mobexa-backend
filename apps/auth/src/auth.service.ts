import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users/users.service';
import { ClientKafka } from '@nestjs/microservices';
import { AuthDto, CreateUserDto } from './dto';
import { ConfigService } from '@nestjs/config';
import { Response, response } from 'express';
export interface TokenPayload {
  userId: number;
  email: string;
}
@Injectable()
export class AuthService {
  /**
   *
   */
  constructor(
    @Inject('AUTH_SERVICE')
    private prisma: PrismaClient,
    private readonly jwtService: JwtService,
    private usersService: UsersService,
    //private readonly authClient: ClientKafka,
    private readonly configService: ConfigService,
  ) {}

  async signup(dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }
  async login(dto: AuthDto, response: Response) {
    let user: User;
    //user = await this.usersService.validateUser(dto.email, dto.password);

    //sign a JWT Token
    const payload: TokenPayload = {
      userId: user.id,
      email: user.email,
    };
    const expires = this.configService.get('JWT_EXPIRATION');
    const token = this.jwtService.sign(payload);

    response.cookie('authentication', token, {
      httpOnly: true,
      expires,
    });
    //return user;
  }


  logout() {}

  /* async createUser(data: CreateUserDto): Promise<Tokens> {
    const hash = await this.hashData(data.password);
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        username: data.username,
        hash,
      },
    });
    const tokens = await this.getTokens(user.id, user.email, user.role);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }*/
}
