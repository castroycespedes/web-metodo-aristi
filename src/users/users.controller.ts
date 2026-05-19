import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Permissions } from '../common/decorators/permissions.decorator';
import { CurrentUser as CurrentUserInterface } from '../common/interfaces/current-user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  me(@CurrentUser() user: CurrentUserInterface) {
    return this.usersService.getAuthProfile(user.id);
  }

  @Get()
  @Permissions('users:read')
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Permissions('users:read')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post()
  @Permissions('users:create')
  create(
    @Body() dto: CreateUserDto,
    @CurrentUser() user: CurrentUserInterface,
  ) {
    return this.usersService.create(dto, user);
  }

  @Patch(':id')
  @Permissions('users:update')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
    @CurrentUser() user: CurrentUserInterface,
  ) {
    return this.usersService.update(id, dto, user);
  }

  @Patch(':id/status')
  @Permissions('users:update')
  updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateUserStatusDto,
    @CurrentUser() user: CurrentUserInterface,
  ) {
    return this.usersService.updateStatus(id, dto, user);
  }
}
