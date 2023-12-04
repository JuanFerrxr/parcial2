import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { AlbumService } from './album.service';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { AlbumDto } from './album.dto/album.dto';
import { plainToInstance } from 'class-transformer';
import { AlbumEntity } from './album.entity/album.entity';
import { FotoEntity } from 'src/foto/foto.entity/foto.entity';
import { FotoDto } from 'src/foto/foto.dto/foto.dto';

@UseInterceptors(BusinessErrorsInterceptor)
@Controller('album')
export class AlbumController {
    constructor(private readonly albumService: AlbumService) {}

    @Get(':albumId')
    async findAlbumById(@Param('museumId') albumId: number) {
      return await this.albumService.findAlbumById(albumId);
    }

    @Post()
    async createAlbum(@Body() albumDto: AlbumDto) {
      const album: AlbumEntity = plainToInstance(AlbumEntity, albumDto);
      return await this.albumService.createAlbum(album);
    }

    @Delete(':albumId')
    @HttpCode(204)
    async deleteAlbum(@Param('albumId') albumId: number) {
      return await this.albumService.deleteAlbum(albumId);
    }

    @Put(':albumId')
    async addPhotoToAlbum(@Param('museumId') albumId: number, fotoId,number, @Body() albumDto: AlbumDto, fotoDto: FotoDto) {
      const album: AlbumEntity = plainToInstance(AlbumEntity, albumDto);
      const foto: FotoEntity = plainToInstance(FotoEntity, fotoDto);
      return await this.albumService.addPhotoToAlbum(albumId, fotoId);
    }
}
