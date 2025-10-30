import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  private readonly logger = new Logger();

  @Post()
  @ApiOperation({ summary: 'criar um novo usuário' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Usuário criado' })
  @ApiResponse({ status: 401, description: 'Dados invalidos' })
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      return this.userService.createUser({
        ...createUserDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Erro ao criar usuário',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete()
  @ApiOperation({ summary: 'criar um novo usuário' })
  @ApiResponse({ status: 204, description: 'Usuários deletados' })
  async deleteAllUsers() {
    try {
      await this.userService.deleteAllUsers();
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Erro ao deletar usuários',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
