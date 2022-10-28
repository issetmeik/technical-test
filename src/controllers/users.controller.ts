import { Controller, Get, Param, Query } from '@nestjs/common';
import { query } from 'express';
import { Paginate } from 'src/interfaces/paginate.interface';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  async findAll(@Query() query: Paginate) {
    console.log(query);
    return await this.usersService.findAll(query);
  }
}
