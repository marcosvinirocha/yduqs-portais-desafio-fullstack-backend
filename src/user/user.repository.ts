import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private prismaService: PrismaService) {}

  async createUser(user: Omit<User, 'id'>) {
    return this.prismaService.user.create({
      data: user,
    });
  }

  async deleteAllUsers() {
    return this.prismaService.user.deleteMany();
  }
}
