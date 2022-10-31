import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Paginate } from 'src/interfaces/paginate.interface';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  @UsePipes(ValidationPipe)
  async findAll(
    @Query()
    query: Paginate,
  ) {
    return await this.usersService.findAll(query);
  }
}
