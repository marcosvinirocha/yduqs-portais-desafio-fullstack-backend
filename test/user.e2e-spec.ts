/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import { AppModule } from 'src/app.module';
import { UserModule } from 'src/user/user.module';

describe('User Controller', () => {
  let app: INestApplication;
  let prismaClient: PrismaClient;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, UserModule, PrismaClient],
    }).compile();
    app = module.createNestApplication();
    await app.init();

    prismaClient = module.get<PrismaClient>(PrismaClient);

    await prismaClient.$executeRaw`TRUNCATE "public"."User" RESTART IDENTITY CASCADE`;
  }, 30000);

  afterAll(async () => {
    await app.close();
    await prismaClient.$disconnect();
  }, 30000);

  describe('Users', () => {
    it('should create new user', async () => {
      const user = {
        email: 'gabriellepereirasouza@armyspy.com',
        birthday: '06/05/1995',
        name: 'Gabrielle Souza',
        cpf: '26947258723',
        graduationDate: '20/01/2023',
        cellphone: '35982295282',
      };
      const response = await request(app.getHttpServer())
        .post('/user')
        .send(user)
        .expect(201);

      expect(response.body).toEqual({
        id: expect.any(Number),
        email: 'gabriellepereirasouza@armyspy.com',
        birthday: '06/05/1995',
        name: 'Gabrielle Souza',
        cpf: '26947258723',
        graduationDate: '20/01/2023',
        cellphone: '35982295282',
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });
  });
});
