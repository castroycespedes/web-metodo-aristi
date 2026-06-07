import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Permissions } from '../common/decorators/permissions.decorator';
import { PermissionsService } from './permissions.service';

@ApiTags('Permissions')
@ApiBearerAuth()
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get()
  @Permissions('permissions:read')
  @ApiOperation({ summary: 'List permissions' })
  findAll() {
    return this.permissionsService.findAll();
  }
}
