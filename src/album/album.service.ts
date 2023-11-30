import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from './album.entity/album.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';

@Injectable()
export class AlbumService {
    constructor(
        @InjectRepository(AlbumEntity)
        private readonly albumRepository: Repository<AlbumEntity>
    ) { }

    async findAlbumById(id: number): Promise<AlbumEntity> {
        const album: AlbumEntity = await this.albumRepository.findOne({ where: { id }, relations: ["nombre", "caratula"] });
        if (!album)
            throw new BusinessLogicException("No se encontró un album con ese ID", BusinessError.NOT_FOUND);

        return album;
    }

    async create(album: AlbumEntity): Promise<AlbumEntity> {
        return await this.albumRepository.save(album);
    }

    async delete(id: number) {
        const albumToDelete: AlbumEntity = await this.findAlbumById(id);
        if (!albumToDelete)
            throw new BusinessLogicException("No se encontró un album con ese ID", BusinessError.NOT_FOUND);
        await this.albumRepository.remove(albumToDelete);
    }

}
