/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/require-await */
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      return this.userService.createUser({
        ...createUserDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } catch (error) {
      throw new HttpException(
        'Erro ao criar usuário',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
