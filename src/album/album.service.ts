import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from './album.entity/album.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';
import { FotoEntity } from 'src/foto/foto.entity/foto.entity';

@Injectable()
export class AlbumService {
    constructor(
        @InjectRepository(AlbumEntity)
        private readonly albumRepository: Repository<AlbumEntity>,
        @InjectRepository(FotoEntity)
        private readonly fotoRepository: Repository<FotoEntity>,
    ) { }

    async findAlbumById(id: number): Promise<AlbumEntity> {
        const album: AlbumEntity = await this.albumRepository.findOne({ where: { id }, relations: ["nombre", "caratula"] });
        if (!album)
            throw new BusinessLogicException("No se encontró un album con ese ID", BusinessError.NOT_FOUND);

        return album;
    }

    async createAlbum(album: AlbumEntity): Promise<AlbumEntity> {
        if (album.titulo.length == 0) {
            throw new Error('El título no debe estar vacío');
        }
        return await this.albumRepository.save(album);
    }

    async deleteAlbum(id: number): Promise<void> {
        const albumToDelete: AlbumEntity = await this.findAlbumById(id);
    
        if (!albumToDelete) {
            throw new BusinessLogicException("No se encontró un album con ese ID", BusinessError.NOT_FOUND);
        }

        if (albumToDelete.foto && albumToDelete.foto.length > 0) {
            throw new BusinessLogicException("No se puede eliminar un álbum si tiene fotos", BusinessError.PRECONDITION_FAILED);
        }
    
        await this.albumRepository.remove(albumToDelete);
    }

    async addPhotoToAlbum(albumId: number, fotoId: number): Promise<void> {
        const album: AlbumEntity = await this.findAlbumById(albumId);
        const foto: FotoEntity = await this.fotoRepository.findOne({ where: { id: fotoId } });

        if (!album || !foto) {
            throw new BusinessLogicException("No se encontró un álbum o foto con esos IDs", BusinessError.NOT_FOUND);
        }
        if (foto.fecha < album.fechaInicio || foto.fecha > album.fechaFin) {
            throw new BusinessLogicException("La fecha de la foto debe estar entre las fechas de inicio y fin del album", BusinessError.BAD_REQUEST);
        }

        album.foto.push(foto);
        await this.albumRepository.save(album);
    }

}
