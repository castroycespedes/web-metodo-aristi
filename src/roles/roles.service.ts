import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { AuthRolePermission } from './entities/auth-role-permission.entity';
import { AuthRole } from './entities/auth-role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(AuthRole)
    private readonly rolesRepository: Repository<AuthRole>,
    @InjectRepository(AuthRolePermission)
    private readonly rolePermissionsRepository: Repository<AuthRolePermission>,
  ) {}

  async findAll(): Promise<AuthRole[]> {
    return this.rolesRepository.find({
      where: { deletedAt: IsNull() },
      order: { name: 'ASC' },
    });
  }

  async findOne(id: string): Promise<AuthRole> {
    const role = await this.rolesRepository.findOne({
      where: { id, deletedAt: IsNull() },
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    return role;
  }

  async findPermissions(id: string) {
    await this.findOne(id);

    const rows = await this.rolePermissionsRepository.find({
      where: { roleId: id, deletedAt: IsNull() },
      relations: { permission: true },
      order: { createdAt: 'ASC' },
    });

    return rows
      .filter((row) => !row.permission.deletedAt)
      .map((row) => row.permission);
  }
}
