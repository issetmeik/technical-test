import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { Paginate } from 'src/interfaces/paginate.interface';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  async findAll(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    query: Paginate,
  ) {
    return await this.usersService.findAll(query);
  }
}
