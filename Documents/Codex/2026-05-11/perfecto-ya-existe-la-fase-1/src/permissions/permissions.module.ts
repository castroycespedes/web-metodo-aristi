import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthPermission } from './entities/auth-permission.entity';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';

@Module({
  imports: [TypeOrmModule.forFeature([AuthPermission])],
  controllers: [PermissionsController],
  providers: [PermissionsService],
  exports: [PermissionsService],
})
export class PermissionsModule {}
