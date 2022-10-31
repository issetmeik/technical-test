import {
  BadGatewayException,
  BadRequestException,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Address, Contact, User } from '../interfaces/user.interface';
import { Paginate } from 'src/interfaces/paginate.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly httpService: HttpService,
  ) {}

  async getUserByEmail(email: string): Promise<User> {
    const user = this.userModel.findOne({ email }).exec();
    return user;
  }

  private store(createUserDto: CreateUserDto[]): void {
    this.userModel.insertMany(createUserDto);
  }

  async findAll(query: Paginate) {
    let users = await this.getUsers(query);
    users = await this.processUsers(users);
    return users.map((user) => {
      return {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        addresses: user.addresses.map((address) => {
          return {
            addressId: address.id,
            address: `${address.street} ${address.number}`,
            country: address.country,
            city: address.city,
            state: address.state,
            zipcode: address.zipcode,
          };
        }),
        contacts: user.contacts.map((contact) => {
          return {
            contactId: contact.id,
            name: contact.name,
            phoneNumber: contact.phoneNumber,
            email: contact.email,
          };
        }),
      };
    });
  }

  async processUsers(users: User[]): Promise<User[]> {
    const newUsers = [];

    for (const user of users) {
      user.fullName = `${user.firstName} ${user.lastName}`;

      const [userExist, addresses, contacts] = await Promise.all([
        this.getUserByEmail(user.email),
        this.getAddressByUserId(user.id),
        this.getContactByUserId(user.id),
      ]);

      if (addresses && addresses.length) user.addresses = addresses;
      if (contacts && contacts.length) user.contacts = contacts;

      if (!userExist) {
        const userDto = new CreateUserDto();

        userDto.fullName = user.fullName;
        userDto.email = user.email;
        userDto.address = user.addresses[0].street;
        userDto.addressNumber = user.addresses[0].number;
        userDto.phoneNumber = user.contacts[0].phoneNumber;

        newUsers.push(userDto);
      }
    }
    if (newUsers && newUsers.length) this.store(newUsers);
    return users;
  }

  async getUsers(query: Paginate): Promise<User[]> {
    try {
      const url = `https://${process.env.MOCK_API_HOST}.mockapi.io/api/v1/users?page=${query.page}&limit=${query.limit}`;

      const { status, data } = await this.httpService
        .get<User[]>(url)
        .toPromise();

      return data;
    } catch (err) {
      throw new HttpException(
        'Não foi possivel buscar a collection de usuarios.',
        err.response.status,
      );
    }
  }

  async getAddressByUserId(userId: string): Promise<Address[]> {
    try {
      const url = `https://${process.env.MOCK_API_HOST}.mockapi.io/api/v1/users/${userId}/address`;

      const { status, data } = await this.httpService
        .get<Address[]>(url)
        .toPromise();
      return data;
    } catch (err) {
      if (err.response.status === 429) {
        throw new HttpException(
          'Por favor use paginação e diminua a quantidade de usuarios, recomendamos no máximo 10 usuarios por requisição.',
          err.response.status,
        );
      }
      throw new HttpException(
        'Não foi possivel buscar os dados de endereço do usuário informado.',
        err.response.status,
      );
    }
  }

  async getContactByUserId(userId: string): Promise<Contact[]> {
    try {
      const url = `https://${process.env.MOCK_API_HOST}.mockapi.io/api/v1/users/${userId}/contacts`;
      const { data } = await this.httpService.get<Contact[]>(url).toPromise();

      return data;
    } catch (err) {
      if (err.response.status === 429) {
        throw new HttpException(
          'Por favor use paginação e diminua a quantidade de usuarios, recomendamos no máximo 10 usuarios por requisição.',
          err.response.status,
        );
      }
      throw new HttpException(
        'Não foi possivel buscar os dados de contato do usuário informado.',
        err.response.status,
      );
    }
  }
}
