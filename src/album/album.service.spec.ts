import { Test, TestingModule } from '@nestjs/testing';
import { AlbumService } from './album.service';
import { FotoEntity } from 'src/foto/foto.entity/foto.entity';
import { AlbumEntity } from './album.entity/album.entity';

describe('AlbumService', () => {
  let service: AlbumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlbumService],
    }).compile();

    service = module.get<AlbumService>(AlbumService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createAlbum', () => {
    it('should create an album', async () => {
      const albumToCreate: AlbumEntity = {
        fechaInicio: new Date(), 
        fechaFin: new Date(), 
        titulo: 'Titulo de album', 
        foto: [],
        id: 0
      };
      const createdAlbum = await service.createAlbum(albumToCreate);
      expect(createdAlbum.id).toBeDefined();
      expect(createdAlbum.titulo).toBe('Titulo de album');
    });

    it('should throw an error if the title is empty', async () => {
      const albumToCreate: AlbumEntity = {
        fechaInicio: new Date(), 
        fechaFin: new Date(), 
        titulo: '', 
        foto: [],
        id: 0
      };
      await expect(service.createAlbum(albumToCreate)).rejects.toThrowError('El título no debe estar vacío');
    });
  });

  describe('findAlbumById', () => {
    it('should find an existing album by id', async () => {
      const existingAlbumId = 1;
      const foundAlbum = await service.findAlbumById(existingAlbumId);
      expect(foundAlbum).toBeDefined();
    });

    it('should throw an error if the album ID does not exist', async () => {
      const nonExistingAlbumId = 99999;
      await expect(service.findAlbumById(nonExistingAlbumId)).rejects.toThrowError(
        'No se encontró un album con ese ID',
      );
    });
  });

  describe('addPhotoToAlbum', () => {
    it('should add a photo to the album', async () => {
      const album: AlbumEntity = { 
        id: 1, 
        fechaInicio: new Date('2023-01-01'), 
        fechaFin: new Date('2023-12-31'), 
        titulo: 'Titulo de album', 
        foto: [] 
      };
      const foto: FotoEntity = {
        id: 1, 
        iso: 200, 
        velObturacion: 10, 
        apertura: 5.6, 
        fecha: new Date('2023-06-15'), 
        usuario: [], 
        album: [] 
      };
      await expect(service.addPhotoToAlbum(album.id, foto.id)).resolves.toBeUndefined();
    });

    it('should throw an error if the photo date is outside the album range', async () => {
      const album: AlbumEntity = { 
        id: 1, 
        fechaInicio: new Date('2023-01-01'), 
        fechaFin: new Date('2023-12-31'), 
        titulo: 'Titulo de album', 
        foto: [] 
      };
      const foto: FotoEntity = { 
        id: 1, 
        iso: 200, 
        velObturacion: 10, 
        apertura: 5.6, 
        fecha: new Date('2022-12-15'), 
        usuario: [], 
        album: [] 
      };
      await expect(service.addPhotoToAlbum(album.id, foto.id)).rejects.toThrowError(
        'La fecha de la foto debe estar entre las fechas de inicio y fin del album',
      );
    });
  });

  describe('deleteAlbum', () => {
    it('should delete an album', async () => {
      const albumToDelete: AlbumEntity = { 
        id: 1, 
        fechaInicio: new Date(), 
        fechaFin: new Date(), 
        titulo: 'Album Test', 
        foto: [] 
      };
      await expect(service.deleteAlbum(albumToDelete.id)).resolves.toBeUndefined();
    });

    it('should throw an error if the album has photos', async () => {
      const albumWithPhotos: AlbumEntity = { 
        id: 1, 
        fechaInicio: new Date(), 
        fechaFin: new Date(), 
        titulo: 'Album Test', 
        foto: [{ 
          id: 1, 
          iso: 200, 
          velObturacion: 10, 
          apertura: 5.6, 
          fecha: new Date(), 
          usuario: [], 
          album: [] 
        }] 
      };
      await expect(service.deleteAlbum(albumWithPhotos.id)).rejects.toThrowError(
        'No se puede eliminar un álbum si tiene fotos',
      );
    });
  });

});
