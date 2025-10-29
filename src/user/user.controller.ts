/* eslint-disable @typescript-eslint/require-await */
import { Controller, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Post()
  async createUser() {
    return 'user created';
  }
}
