import { CreateUserDto } from '../dto/create-user.dto';
import { UsersService } from './users.service';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';

@Controller('auth/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    
    @Post('create')
    async createUser(@Body(ValidationPipe) dto: CreateUserDto) {
        return this.usersService.createUser(dto);
    }
}
