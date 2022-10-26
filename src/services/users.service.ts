import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Address, User } from '../interfaces/user.interface';
import { map, Observable } from 'rxjs';
import { HttpsService } from './https.service';

@Injectable()
export class UsersService {
  constructor(private readonly httpsService: HttpsService) {}

  async findAll() {
    const users = await this.httpsService.GetUsers();

    return users[1];
  }
}
