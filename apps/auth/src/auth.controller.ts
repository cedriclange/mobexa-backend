import { Body, Controller, Get, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { Tokens } from './types';
import { AuthDto, CreateUserDto } from './dto';
import { LocalAuthGuard } from '@app/shared/guards';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  
  @Post('signup')
  async signup(@Body(ValidationPipe) dto:CreateUserDto) { 
    return this.authService.signup(dto);
  }
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body(ValidationPipe) dto:AuthDto, response:Response) {
    return this.authService.login(dto,response);
  }

  /**
  @EventPattern('create_user')
  handlecreateUser(@Payload(ValidationPipe) data:CreateUserDto ):Promise<Tokens> {
    return this.authService.createUser(data);
  }**/
}
