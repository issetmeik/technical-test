import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { Address, User } from 'src/interfaces/user.interface';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class HttpsService {
  constructor(private readonly httpService: HttpService) {}

  async GetUsers(): Promise<User[]> {
    try {
      const url = 'https://62151ae9cdb9d0977adf48c.mockapi.io/api/v1/users';

      const { status, data } = await this.httpService
        .get<User[]>(url)
        .toPromise();
      if (status !== 200) {
        throw new BadRequestException(
          `Erro na API MOCK, por favor cheque suas credencias e tente novamente.`,
        );
      }

      return data;
    } catch {}
  }

  async GetAddressByUserId(userId: string): Promise<Address[]> {
    const url = `https://62151ae9cdb9d09717adf48c.mockapi.io/api/v1/users/${userId}/address`;

    const { status, data } = await this.httpService
      .get<Address[]>(url)
      .toPromise();

    if (status !== 200) {
      throw new BadRequestException(
        `Erro na API MOCK, por favor cheque suas credencias e tente novamente.`,
      );
    }

    return data;
  }
}
