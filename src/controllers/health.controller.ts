import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MongooseHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private mongoose: MongooseHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  async check() {
    const terminusData = await this.health.check([
      async () => this.mongoose.pingCheck('mongoose'),
    ]);
    const version = process.env.VERSION;
    return { ...terminusData, version };
  }
}
