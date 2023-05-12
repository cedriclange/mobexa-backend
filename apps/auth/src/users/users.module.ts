import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '@app/shared/prisma';

@Module({
  imports:[PrismaModule],
  controllers:[UsersController],
  providers: [UsersService],
  exports:[UsersService],
})
export class UsersModule {}
