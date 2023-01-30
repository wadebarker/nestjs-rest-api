import { IsString, IsInt, IsAlpha, Length, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCatDto {
  @ApiProperty({
    description: 'The name of cat',
    type: String,
    default: '',
  })
  @IsString()
  @IsAlpha()
  @Length(2, 20)
  name: string;

  @ApiProperty({
    description: 'The age of cat',
    minimum: 0,
    maximum: 18,
    type: Number,
    default: 0,
  })
  @IsInt()
  @Min(0)
  @Max(18)
  age: number;

  @ApiProperty({
    description: 'The breed of cat',
    type: String,
    default: '',
  })
  @IsString()
  @IsAlpha()
  @Length(2, 20)
  breed: string;
}
