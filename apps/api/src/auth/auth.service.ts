import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateUserDto } from '@app/shared/dtos';
import { AuthDto } from "@app/shared/dtos";

@Injectable()
export class AuthService {
  /**
   * this is where we need to declare functions to handle controlers route
   * and send to the microservices
   */
  constructor(
    @Inject('AUTH_MICROSERVICE') private readonly authClient: ClientKafka,
  ) {}

  async signUp(data: CreateUserDto) {
    await this.authClient.emit('create_user', JSON.stringify(data));
  }
  async login(data: AuthDto) {
    await this.authClient.emit('get_user', JSON.stringify(data));
  }
}
