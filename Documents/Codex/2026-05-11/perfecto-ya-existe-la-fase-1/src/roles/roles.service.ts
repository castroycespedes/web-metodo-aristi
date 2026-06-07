import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthRole } from './entities/auth-role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(AuthRole)
    private readonly rolesRepository: Repository<AuthRole>,
  ) {}

  findAll(): Promise<AuthRole[]> {
    return this.rolesRepository.find({
      relations: { permissions: true },
      order: { name: 'ASC' },
    });
  }

  async findById(id: string): Promise<AuthRole> {
    const role = await this.rolesRepository.findOne({
      where: { id },
      relations: { permissions: true },
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    return role;
  }

  async findPermissions(id: string) {
    const role = await this.findById(id);
    return role.permissions ?? [];
  }
}
