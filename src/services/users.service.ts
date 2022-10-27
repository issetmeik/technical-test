import { BadRequestException, Injectable } from '@nestjs/common';
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

  private store(createUserDto: CreateUserDto): void {
    const newUser = new this.userModel(createUserDto);
    newUser.save();
  }

  async findAll(query: Paginate) {
    let users = await this.getUsers(query);
    users = await this.processUsers(users);
    return users.map((user) => {
      return {
        id: user.id,
        fullName: `${user.firstName} ${user.lastName}`,
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
        /*contacts: user.contacts.map((contact) => {
          return {
            contactId: contact.id,
            name: contact.name,
            phoneNumber: contact.phoneNumber,
            email: contact.email,
          };
        }),*/
      };
    });
  }

  async getUsers(query: Paginate): Promise<User[]> {
    try {
      const url = `https://${process.env.MOCK_API_HOST}.mockapi.io/api/v1/users?page=${query.page}&limit=${query.limit}`;

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

  async processUsers(users: User[]): Promise<User[]> {
    for (const user of users) {
      user.addresses = await this.getAddressByUserId(user.id);
      //user.contacts = await this.getContactByUserId(user.id);
      const userExist = await this.getUserByEmail(user.email);
      if (!userExist) {
        const userDto = new CreateUserDto();
        userDto.fullName = `${user.firstName} ${user.lastName}`;
        userDto.email = user.email;
        userDto.address = user.addresses[0].street;
        userDto.addressNumber = user.addresses[0].number;
        userDto.phoneNumber = '123456';

        this.store(userDto);
      }
    }

    return users;
  }

  async getAddressByUserId(userId: string): Promise<Address[]> {
    const url = `https://${process.env.MOCK_API_HOST}.mockapi.io/api/v1/users/${userId}/address`;

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

  async getContactByUserId(userId: string): Promise<Contact[]> {
    const url = `https://62151ae9cdb9d09717adf48c.mockapi.io/api/v1/users/${userId}/contact`;

    const { status, data } = await this.httpService
      .get<Contact[]>(url)
      .toPromise();

    if (status !== 200) {
      throw new BadRequestException(
        `Erro na API MOCK, por favor cheque suas credencias e tente novamente.`,
      );
    }

    return data;
  }
}
