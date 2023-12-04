import { Body, Controller, Delete, Get, HttpCode, Param, Post, UseInterceptors } from '@nestjs/common';
import { FotoService } from './foto.service';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { FotoEntity } from './foto.entity/foto.entity';
import { plainToInstance } from 'class-transformer';
import { FotoDto } from './foto.dto/foto.dto';

@UseInterceptors(BusinessErrorsInterceptor)
@Controller('foto')
export class FotoController {
    constructor(private readonly fotoService: FotoService) {}

    @Get()
    async findAllFotos() {
      return await this.fotoService.findAllFotos    ();
    }

    @Get(':museumId')
    async findFotoById(@Param('fotoId') fotoId: number) {
      return await this.fotoService.findFotoById(fotoId);
    }

    @Post()
    async create(@Body() fotoDto: FotoDto) {
      const foto: FotoEntity = plainToInstance(FotoEntity, fotoDto);
      return await this.fotoService.createFoto(foto);
    }

    @Delete(':fotoId')
    @HttpCode(204)
    async delete(@Param('fotoId') fotoId: number) {
      return await this.fotoService.deleteFoto(fotoId);
    }

    
}
