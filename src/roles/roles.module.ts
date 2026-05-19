import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthPermission } from '../permissions/entities/auth-permission.entity';
import { AuthRolePermission } from './entities/auth-role-permission.entity';
import { AuthRole } from './entities/auth-role.entity';
import { AuthUserRole } from './entities/auth-user-role.entity';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AuthRole,
      AuthPermission,
      AuthRolePermission,
      AuthUserRole,
    ]),
  ],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
