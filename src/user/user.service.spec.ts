/* eslint-disable @typescript-eslint/require-await */
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { PrismaService } from 'src/db/prisma.service';
import { UserModule } from './user.module';

const MOCKED_USER = {
  email: 'gabriellepereirasouza@armyspy.com',
  birthday: '06/05/1995',
  name: 'Gabrielle Souza',
  cpf: '26947258723',
  graduationYear: '2023',
  cellphone: '35982295282',
};

describe('UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    }).compile();

    userService = module.get<UserService>(UserService);

    await userService.deleteAllUsers();
  });

  beforeAll(async () => {
    userService = new UserService(new UserRepository(new PrismaService()));
  });

  afterEach(async () => {
    await userService.deleteAllUsers();
  });

  it('user should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('create user', () => {
    it('should create new user correctly', async () => {
      const responseData = await userService.createUser({
        ...MOCKED_USER,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      expect(responseData).toEqual({
        id: responseData.id,
        email: 'gabriellepereirasouza@armyspy.com',
        name: 'Gabrielle Souza',
        cpf: '26947258723',
        birthday: '06/05/1995',
        graduationYear: '2023',
        cellphone: '35982295282',
        createdAt: responseData.createdAt,
        updatedAt: responseData.updatedAt,
      });
    });
  });
});
