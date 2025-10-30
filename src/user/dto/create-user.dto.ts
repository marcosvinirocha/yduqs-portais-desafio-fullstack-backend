import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { IsCPF } from 'class-validator-cpf';

export class CreateUserDto {
  @ApiProperty({
    example: 'marcos.teste@teste.com',
    description: 'email do usuário',
  })
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @ApiProperty({
    example: 'marcos teste',
    description: 'nome do usuário',
  })
  @IsNotEmpty({
    message: 'O campo nome é obrigatório.',
  })
  name: string;

  @ApiProperty({
    example: '269.472.587-23',
    description: 'cpf do usuário',
  })
  @IsCPF({ message: 'CPF inválido' })
  @Matches(/^\d{11}$/, { message: 'CPF deve ter 11 digitos' })
  cpf: string;

  @ApiProperty({
    example: '20/01/1995',
    description: 'data de nascimento do usuário',
  })
  @IsNotEmpty({
    message: 'O campo data de nascimento é obrigatório.',
  })
  birthday: string;

  @ApiProperty({
    example: '20/02/2023',
    description: 'data de graduação do usuário',
  })
  @IsNotEmpty({
    message: 'O campo data de graduação é obrigatório.',
  })
  graduationDate: string;

  @ApiProperty({
    example: '009999-9999',
    description: 'celular do usuário',
  })
  @IsNotEmpty({
    message: 'O campo celular é obrigatório.',
  })
  cellphone: string;
}
