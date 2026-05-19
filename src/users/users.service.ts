import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { In, IsNull, Repository } from 'typeorm';
import { AuthUserRole } from '../roles/entities/auth-user-role.entity';
import { AuthRole } from '../roles/entities/auth-role.entity';
import { CurrentUser } from '../common/interfaces/current-user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthUser, UserStatus } from './entities/auth-user.entity';

export interface UserAuthProfile {
  id: string;
  email: string;
  username: string | null;
  avatarUrl: string | null;
  status: UserStatus;
  roles: string[];
  permissions: string[];
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(AuthUser)
    private readonly usersRepository: Repository<AuthUser>,
    @InjectRepository(AuthRole)
    private readonly rolesRepository: Repository<AuthRole>,
    @InjectRepository(AuthUserRole)
    private readonly userRolesRepository: Repository<AuthUserRole>,
    private readonly configService: ConfigService,
  ) {}

  async findAll(): Promise<UserAuthProfile[]> {
    const users = await this.usersRepository.find({
      where: { deletedAt: IsNull() },
      order: { createdAt: 'DESC' },
    });

    return Promise.all(users.map((user) => this.toAuthProfile(user)));
  }

  async findOne(id: string): Promise<UserAuthProfile> {
    const user = await this.usersRepository.findOne({
      where: { id, deletedAt: IsNull() },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.toAuthProfile(user);
  }

  async findByEmailWithPassword(email: string): Promise<AuthUser | null> {
    return this.usersRepository
      .createQueryBuilder('user')
      .addSelect('user.passwordHash')
      .where('user.email = :email', { email: email.toLowerCase() })
      .andWhere('user.deletedAt IS NULL')
      .getOne();
  }

  async findByIdWithRefreshToken(id: string): Promise<AuthUser | null> {
    return this.usersRepository
      .createQueryBuilder('user')
      .addSelect('user.refreshTokenHash')
      .where('user.id = :id', { id })
      .andWhere('user.deletedAt IS NULL')
      .getOne();
  }

  async create(dto: CreateUserDto, actor?: CurrentUser): Promise<UserAuthProfile> {
    const email = dto.email.toLowerCase();
    const existing = await this.usersRepository.findOne({
      where: { email, deletedAt: IsNull() },
    });

    if (existing) {
      throw new ConflictException('Email already exists');
    }

    const saltRounds = this.configService.get<number>('app.bcryptSaltRounds') ?? 10;
    const passwordHash = await bcrypt.hash(dto.password, saltRounds);
    const user = this.usersRepository.create({
      email,
      username: dto.username,
      passwordHash,
      status: UserStatus.Active,
      createdBy: actor?.id ?? null,
      updatedBy: actor?.id ?? null,
    });

    const savedUser = await this.usersRepository.save(user);

    if (dto.roleIds?.length) {
      const roles = await this.rolesRepository.find({
        where: { id: In(dto.roleIds), deletedAt: IsNull() },
      });

      if (roles.length !== dto.roleIds.length) {
        throw new BadRequestException('One or more roles do not exist');
      }

      await this.userRolesRepository.save(
        roles.map((role) =>
          this.userRolesRepository.create({
            userId: savedUser.id,
            roleId: role.id,
            createdBy: actor?.id ?? null,
            updatedBy: actor?.id ?? null,
          }),
        ),
      );
    }

    return this.findOne(savedUser.id);
  }

  async update(
    id: string,
    dto: UpdateUserDto,
    actor?: CurrentUser,
  ): Promise<UserAuthProfile> {
    const user = await this.usersRepository.findOne({
      where: { id, deletedAt: IsNull() },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.username = dto.username ?? user.username;
    user.avatarUrl = dto.avatarUrl ?? user.avatarUrl;
    user.updatedBy = actor?.id ?? null;

    await this.usersRepository.save(user);
    return this.findOne(id);
  }

  async updateStatus(
    id: string,
    dto: UpdateUserStatusDto,
    actor?: CurrentUser,
  ): Promise<UserAuthProfile> {
    const user = await this.usersRepository.findOne({
      where: { id, deletedAt: IsNull() },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.status = dto.status;
    user.updatedBy = actor?.id ?? null;

    await this.usersRepository.save(user);
    return this.findOne(id);
  }

  async updateLastLogin(userId: string): Promise<void> {
    await this.usersRepository.update(userId, { lastLoginAt: new Date() });
  }

  async setRefreshTokenHash(
    userId: string,
    refreshTokenHash: string | null,
  ): Promise<void> {
    await this.usersRepository.update(userId, { refreshTokenHash });
  }

  async getAuthProfile(userId: string): Promise<UserAuthProfile> {
    const user = await this.usersRepository.findOne({
      where: { id: userId, deletedAt: IsNull() },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.toAuthProfile(user);
  }

  async toAuthProfile(user: AuthUser): Promise<UserAuthProfile> {
    const rows = await this.userRolesRepository
      .createQueryBuilder('userRole')
      .innerJoin('userRole.role', 'role', 'role.deletedAt IS NULL')
      .leftJoin('role.rolePermissions', 'rolePermission', 'rolePermission.deletedAt IS NULL')
      .leftJoin('rolePermission.permission', 'permission', 'permission.deletedAt IS NULL')
      .select([
        'role.name AS role_name',
        'permission.name AS permission_name',
      ])
      .where('userRole.userId = :userId', { userId: user.id })
      .andWhere('userRole.deletedAt IS NULL')
      .getRawMany<{ role_name: string; permission_name: string | null }>();

    const roles = [...new Set(rows.map((row) => row.role_name))].sort();
    const permissions = [
      ...new Set(
        rows
          .map((row) => row.permission_name)
          .filter((permission): permission is string => Boolean(permission)),
      ),
    ].sort();

    return {
      id: user.id,
      email: user.email,
      username: user.username,
      avatarUrl: user.avatarUrl,
      status: user.status,
      roles,
      permissions,
    };
  }
}
