import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthController {
  @Get('health')
  getHealth() {
    return {
      success: true,
      service: 'metodo-aristi-api',
      timestamp: new Date().toISOString(),
    };
  }
}
