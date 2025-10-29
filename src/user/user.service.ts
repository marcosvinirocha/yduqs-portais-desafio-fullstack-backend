import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(user: Omit<User, 'id'>) {
    const createdUser = await this.userRepository.createUser(user);
    return createdUser;
  }
}
