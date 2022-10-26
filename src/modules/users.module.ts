import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UsersService } from '../services/users.service';
import { UsersController } from '../controllers/users.controller';
import { HttpsService } from 'src/services/https.service';

@Module({
  controllers: [UsersController],
  imports: [HttpModule],
  providers: [UsersService, HttpsService],
})
export class UsersModule {}
