import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Permissions } from '../common/decorators/permissions.decorator';
import { RolesService } from './roles.service';

@ApiTags('Roles')
@ApiBearerAuth()
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @Permissions('roles:read')
  @ApiOperation({ summary: 'List roles' })
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @Permissions('roles:read')
  @ApiOperation({ summary: 'Get role by id' })
  @ApiParam({ name: 'id', type: String, format: 'uuid' })
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.rolesService.findById(id);
  }

  @Get(':id/permissions')
  @Permissions('roles:read')
  @ApiOperation({ summary: 'List permissions assigned to a role' })
  @ApiParam({ name: 'id', type: String, format: 'uuid' })
  permissions(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.rolesService.findPermissions(id);
  }
}
