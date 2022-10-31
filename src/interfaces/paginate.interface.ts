import { IsNotEmpty, IsNumber } from 'class-validator';

export class Paginate {
  @IsNotEmpty({ message: 'O parâmetro PAGE é obrigatório.' })
  page: number;

  @IsNotEmpty({ message: 'O parâmetro LIMIT é obrigatório.' })
  limit: number;
}
