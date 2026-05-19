import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthUserRole } from '../roles/entities/auth-user-role.entity';
import { AuthRole } from '../roles/entities/auth-role.entity';
import { AuthUser } from './entities/auth-user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([AuthUser, AuthRole, AuthUserRole])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
