import { PrismaService } from '@app/shared/prisma';
import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from '../dto';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  //this function is to create a user
  async createUser(dto: CreateUserDto) {
    //if the user exist it will throw an exception
    await this.checkEmail(dto.email);
    const hash = await bcrypt.hash(dto.password, 10);
    const user = this.prisma.user.create({
      data: {
        email: dto.email,
        username: dto.username,
        hash,
      },
    });
    return user;
  }

  //this function is to check if User email exist
  private async checkEmail(email: string) {
    let user: any;
    try {
      user = await this.prisma.user.findUnique({
        where: {
          email: email,
        },
      });
    } catch (error) {}
    if (user) {
      throw new UnprocessableEntityException('Email already exists.');
    }
  }

  //this is to find the User with the matched email
  private async findOneByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }
    
    //find user by Id
  private async findOneById(userId: number) {
    return this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
  }
  //this function is to validate user and return user object
  async validateUser(email: string, password: string) {
    const user = await this.findOneByEmail(email);
    const passwordIsValid = await bcrypt.compare(password, user.hash);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
    return user;
  }
    async getUser(id: number): Promise<User> {
        return await this.findOneById(id);
  }
}
