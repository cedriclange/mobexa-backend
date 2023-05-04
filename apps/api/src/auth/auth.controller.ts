import { Controller, Post, ValidationPipe, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '@app/shared/dtos';
import { AuthDto } from '@app/shared/dtos'

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }
    
    @Post('sing-up')
    singnUp(@Body(ValidationPipe) data: CreateUserDto ) {
        return this.authService.signUp(data)
    }
    @Post('login')
    login(@Body(ValidationPipe) data:AuthDto ) {
        return this.authService.login(data)
    }
}


