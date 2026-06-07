import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { In, Repository } from 'typeorm';
import { CurrentUser } from '../common/interfaces/current-user.interface';
import { AuthRole } from '../roles/entities/auth-role.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthUser } from './entities/auth-user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(AuthUser)
    private readonly usersRepository: Repository<AuthUser>,
    @InjectRepository(AuthRole)
    private readonly rolesRepository: Repository<AuthRole>,
    private readonly configService: ConfigService,
  ) {}

  async findAll(): Promise<AuthUser[]> {
    return this.usersRepository.find({
      relations: { roles: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string): Promise<AuthUser> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: { roles: { permissions: true } },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByEmailWithPassword(email: string): Promise<AuthUser | null> {
    return this.usersRepository
      .createQueryBuilder('user')
      .addSelect('user.passwordHash')
      .leftJoinAndSelect('user.roles', 'roles')
      .leftJoinAndSelect('roles.permissions', 'permissions')
      .where('LOWER(user.email) = LOWER(:email)', { email })
      .getOne();
  }

  async findByIdWithRefreshToken(id: string): Promise<AuthUser | null> {
    return this.usersRepository
      .createQueryBuilder('user')
      .addSelect('user.refreshTokenHash')
      .leftJoinAndSelect('user.roles', 'roles')
      .leftJoinAndSelect('roles.permissions', 'permissions')
      .where('user.id = :id', { id })
      .getOne();
  }

  async findActiveUserContext(id: string): Promise<CurrentUser> {
    const user = await this.findById(id);

    if (!user.isActive) {
      throw new UnauthorizedException('User is inactive');
    }

    return this.toCurrentUser(user);
  }

  async create(dto: CreateUserDto): Promise<AuthUser> {
    await this.ensureUniqueIdentity(dto.email, dto.username);
    const roles = await this.resolveRoles(dto.roleIds);
    const passwordHash = await this.hashPassword(dto.password);

    const user = this.usersRepository.create({
      email: dto.email.toLowerCase(),
      username: dto.username,
      passwordHash,
      firstName: dto.firstName ?? null,
      lastName: dto.lastName ?? null,
      roles,
    });

    return this.usersRepository.save(user);
  }

  async update(id: string, dto: UpdateUserDto): Promise<AuthUser> {
    const user = await this.findById(id);

    if (
      (dto.email && dto.email.toLowerCase() !== user.email.toLowerCase()) ||
      (dto.username && dto.username !== user.username)
    ) {
      await this.ensureUniqueIdentity(
        dto.email ?? user.email,
        dto.username ?? user.username,
        id,
      );
    }

    if (dto.roleIds) {
      user.roles = await this.resolveRoles(dto.roleIds);
    }

    Object.assign(user, {
      email: dto.email ? dto.email.toLowerCase() : user.email,
      username: dto.username ?? user.username,
      firstName: dto.firstName ?? user.firstName,
      lastName: dto.lastName ?? user.lastName,
    });

    return this.usersRepository.save(user);
  }

  async updateStatus(
    id: string,
    dto: UpdateUserStatusDto,
  ): Promise<AuthUser> {
    const user = await this.findById(id);
    user.isActive = dto.isActive;
    if (!dto.isActive) {
      user.refreshTokenHash = null;
    }

    return this.usersRepository.save(user);
  }

  async setRefreshTokenHash(id: string, token: string): Promise<void> {
    const refreshTokenHash = await this.hashPassword(token);
    await this.usersRepository.update(id, { refreshTokenHash });
  }

  async clearRefreshToken(id: string): Promise<void> {
    await this.usersRepository.update(id, { refreshTokenHash: null });
  }

  async touchLastLogin(id: string): Promise<void> {
    await this.usersRepository.update(id, { lastLoginAt: new Date() });
  }

  async comparePassword(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }

  toCurrentUser(user: AuthUser): CurrentUser {
    const roles = user.roles?.map((role) => role.name) ?? [];
    const permissions = [
      ...new Set(
        user.roles?.flatMap((role) =>
          role.permissions?.map((permission) => permission.name) ?? [],
        ) ?? [],
      ),
    ];

    return {
      id: user.id,
      email: user.email,
      username: user.username,
      roles,
      permissions,
    };
  }

  private async hashPassword(plain: string): Promise<string> {
    const rounds = this.configService.get<number>('app.bcryptSaltRounds') ?? 10;
    return bcrypt.hash(plain, rounds);
  }

  private async ensureUniqueIdentity(
    email: string,
    username: string,
    excludedUserId?: string,
  ): Promise<void> {
    const existing = await this.usersRepository
      .createQueryBuilder('user')
      .where('(LOWER(user.email) = LOWER(:email) OR user.username = :username)', {
        email,
        username,
      })
      .getMany();

    const conflict = existing.find((user) => user.id !== excludedUserId);
    if (conflict) {
      throw new ConflictException('Email or username already exists');
    }
  }

  private async resolveRoles(roleIds?: string[]): Promise<AuthRole[]> {
    if (!roleIds?.length) {
      return [];
    }

    const roles = await this.rolesRepository.findBy({ id: In(roleIds) });
    if (roles.length !== roleIds.length) {
      throw new NotFoundException('One or more roles were not found');
    }

    return roles;
  }
}
