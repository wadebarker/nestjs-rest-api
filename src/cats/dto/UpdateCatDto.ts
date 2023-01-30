import { IsString, IsAlpha, IsInt, IsOptional, Length } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCatDto {
  @ApiPropertyOptional({
    description: 'The name of cat',
    type: String,
    default: '',
  })
  @IsOptional()
  @IsString()
  @IsAlpha()
  @Length(2, 20)
  name?: string;

  @ApiPropertyOptional({
    description: 'The age of cat',
    type: Number,
    default: 0,
  })
  @IsOptional()
  @IsInt()
  age?: number;

  @ApiPropertyOptional({
    description: 'The breed of cat',
    type: String,
    default: '',
  })
  @IsOptional()
  @IsString()
  @IsAlpha()
  @Length(2, 20)
  breed?: string;
}
