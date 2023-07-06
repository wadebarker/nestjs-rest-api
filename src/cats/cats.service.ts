import { Injectable, NotFoundException } from '@nestjs/common';
import { Cat } from './entity/cat.entity';
import { CreateCatDto } from './dto/CreateCatDto';
import { UpdateCatDto } from './dto/UpdateCatDto';

@Injectable()
export class CatsService {
  private cats: Cat[] = [];

  findAll(name?: string): Cat[] {
    if (name) {
      const cats: Cat[] = this.cats.filter(
        (cat) => cat.name.toLowerCase() === name.toLowerCase(),
      );
      return cats;
    }
    return this.cats;
  }

  findById(id: number): Cat {
    const cat: Cat = this.cats.find((c) => c.id === id);
    if (!cat) {
      throw new NotFoundException();
    }
    return cat;
  }

  create(createCatDto: CreateCatDto): Cat {
    const cat: Cat = {
      id: Date.now(),
      ...createCatDto,
    };
    this.cats.push(cat);
    return cat;
  }

  update(id: number, updateCatDto: UpdateCatDto): Cat {
    const index: number = this.cats.findIndex((cat) => cat.id === id);
    if (index === -1) {
      throw new NotFoundException();
    }
    let cat: Cat = this.cats[index];
    cat = {
      ...cat,
      ...updateCatDto,
    };
    this.cats.splice(index, 1, cat);
    return cat;
  }
  delete(id: number): void {
    const index: number = this.cats.findIndex((cat) => cat.id === id);
    if (index === -1) {
      throw new NotFoundException();
    }
    this.cats.splice(index, 1);
  }
}
