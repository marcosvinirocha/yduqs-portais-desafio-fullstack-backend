import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  private readonly logger = new Logger(UserService.name);

  async createUser(user: Omit<User, 'id'>) {
    this.logger.log('Criando usuário...');
    const createdUser = await this.userRepository.createUser(user);
    this.logger.log(`Usuário criado com sucesso. ID: ${createdUser.id}`);
    return createdUser;
  }
}
