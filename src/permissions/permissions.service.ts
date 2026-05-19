import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { AuthPermission } from './entities/auth-permission.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(AuthPermission)
    private readonly permissionsRepository: Repository<AuthPermission>,
  ) {}

  async findAll(): Promise<AuthPermission[]> {
    return this.permissionsRepository.find({
      where: { deletedAt: IsNull() },
      order: { resource: 'ASC', action: 'ASC' },
    });
  }
}
