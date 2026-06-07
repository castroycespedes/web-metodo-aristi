import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Permissions } from '../common/decorators/permissions.decorator';
import { CurrentUser as CurrentUserPayload } from '../common/interfaces/current-user.interface';
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
  @ApiOperation({ summary: 'Get current authenticated user' })
  me(@CurrentUser() user: CurrentUserPayload) {
    return user;
  }

  @Get()
  @Permissions('users:read')
  @ApiOperation({ summary: 'List users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Permissions('users:read')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiParam({ name: 'id', type: String, format: 'uuid' })
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.findById(id);
  }

  @Post()
  @Permissions('users:create')
  @ApiOperation({ summary: 'Create user' })
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Patch(':id')
  @Permissions('users:update')
  @ApiOperation({ summary: 'Update user' })
  @ApiParam({ name: 'id', type: String, format: 'uuid' })
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(id, dto);
  }

  @Patch(':id/status')
  @Permissions('users:update')
  @ApiOperation({ summary: 'Activate or deactivate user' })
  @ApiParam({ name: 'id', type: String, format: 'uuid' })
  updateStatus(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateUserStatusDto,
  ) {
    return this.usersService.updateStatus(id, dto);
  }
}
