/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { IsCPF } from 'class-validator-cpf';

export class CreateUserDto {
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @IsNotEmpty({
    message: 'O campo nome é obrigatório.',
  })
  name: string;

  @IsCPF({ message: 'CPF inválido' })
  @Matches(/^\d{11}$/, { message: 'CPF must have 11 digits' })
  cpf: string;

  @IsNotEmpty({
    message: 'O campo data de nascimento é obrigatório.',
  })
  birthday: string;

  @IsNotEmpty({
    message: 'O campo data de graduação é obrigatório.',
  })
  graduationDate: string;

  @IsNotEmpty({
    message: 'O campo celular é obrigatório.',
  })
  cellphone: string;
}
