import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthPermission } from './entities/auth-permission.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(AuthPermission)
    private readonly permissionsRepository: Repository<AuthPermission>,
  ) {}

  findAll(): Promise<AuthPermission[]> {
    return this.permissionsRepository.find({
      order: { name: 'ASC' },
    });
  }
}
