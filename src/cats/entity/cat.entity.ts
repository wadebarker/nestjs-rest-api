import { ApiProperty } from '@nestjs/swagger';

export class Cat {
  @ApiProperty({
    description: 'The ID of cat',
    type: Number,
  })
  id: number;

  @ApiProperty({
    description: 'The name of cat',
    type: String,
  })
  name: string;

  @ApiProperty({
    description: 'The age of cat',
    type: Number,
  })
  age: number;

  @ApiProperty({
    description: 'The breed of cat',
    type: String,
  })
  breed: string;
}
