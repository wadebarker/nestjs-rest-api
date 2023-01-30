import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Query,
  Param,
  Body,
  HttpCode,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { CatsService } from './cats.service';
import { Cat } from './entities/cat.entity';
import { CreateCatDto } from './dto/CreateCatDto';
import { UpdateCatDto } from './dto/UpdateCatDto';

@ApiTags('Cats')
@Controller('cats')
export class CatsController {
  constructor(private catService: CatsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all cats' })
  @ApiQuery({ name: 'name', required: false })
  @ApiOkResponse({
    status: 200,
    description: 'The list of cats',
    type: [Cat],
  })
  findAll(@Query('name') name?: string): Cat[] {
    return this.catService.findAll(name);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get cat by id' })
  @ApiOkResponse({
    status: 200,
    description: 'The cat was found',
    type: Cat,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'The cat was not found',
  })
  findById(@Param('id', ParseIntPipe) id: number): Cat {
    return this.catService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a cat' })
  @ApiCreatedResponse({
    status: 201,
    description: 'The cat successfully created',
    type: CreateCatDto,
  })
  create(@Body() createCatDto: CreateCatDto): Cat {
    return this.catService.create(createCatDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update cat' })
  @ApiOkResponse({
    status: 200,
    description: 'The cat successfully updated',
    type: UpdateCatDto,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCatDto: UpdateCatDto,
  ): Cat {
    return this.catService.update(id, updateCatDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete cat' })
  @ApiNoContentResponse({
    status: 204,
    description: 'The cat successfully deleted',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'The cat was not found',
  })
  @HttpCode(204)
  delete(@Param('id', ParseIntPipe) id: number): void {
    return this.catService.delete(id);
  }
}
