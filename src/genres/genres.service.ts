import { Injectable } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from './entities/genre.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  //-------------------CREATE-------------------------------------
  async create(createGenreDto: CreateGenreDto) {
    const { description } = createGenreDto;

    // Buscar si el género ya existe
    console.log(description);
    const existingGenre = await this.findOneByDesc(description);
    if (existingGenre) {
      // El género ya existe, no hacemos nada
      return existingGenre; // Puedes devolver el género existente si es necesario
    }

    // Crear y guardar el nuevo género si no existe
    const newGenre = this.genreRepository.create({ description });
    return this.genreRepository.save(newGenre);
  }
  //-----------------------------------------------------------------------
  async findOneByDesc(desc: string) {
    console.log(desc);
    return await this.genreRepository.findOneBy({ description: desc });
  }

  findAll() {
    return `This action returns all genres`;
  }

  findOne(id: number) {
    return `This action returns a #${id} genre`;
  }

  update(id: number, updateGenreDto: UpdateGenreDto) {
    return `This action updates a #${id} genre`;
  }

  remove(id: number) {
    return `This action removes a #${id} genre`;
  }
}
