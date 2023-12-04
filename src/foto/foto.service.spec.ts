import { Test, TestingModule } from '@nestjs/testing';
import { FotoService } from './foto.service';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';
import { FotoEntity } from './foto.entity/foto.entity';
import { Repository } from 'typeorm';
import { AlbumService } from 'src/album/album.service';


describe('FotoService', () => {
  let service: FotoService;
  let repository: Repository<FotoEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FotoService],
    }).compile();

    service = module.get<FotoService>(FotoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  describe('createFoto', () => {
    it('should create a foto', async () => {
      const validFoto: FotoEntity = {
        iso: 200,
        velObturacion: 5,
        apertura: 10,
        fecha: new Date(),
        id: 0,
        usuario: [],
        album: []
      };

      jest.spyOn(repository, 'save').mockResolvedValueOnce(validFoto);

      const createdFoto = await service.createFoto(validFoto);

      expect(createdFoto).toEqual(validFoto);
      expect(repository.save).toHaveBeenCalledWith(validFoto);
    });

    it('should throw BusinessLogicException for 2 values above the median', async () => {
      const invalidFoto: FotoEntity = {
        iso: 3200,
        velObturacion: 150,
        apertura: 20,
        fecha: new Date(),
        id: 0,
        usuario: [],
        album: []
      };

      await expect(service.createFoto(invalidFoto)).rejects.toThrowError(
        new BusinessLogicException('Máximo 2 de estos valores deben estar por encima del valor medio de sus cotas.', BusinessError.BAD_REQUEST)
      );
    });
  });

  describe('findFotoById', () => {
    it('should find an existing foto by ID', async () => {
      const existingFotoId = 1;
      const foundFoto = await service.findFotoById(existingFotoId);
      expect(foundFoto).toBeDefined();
    });

    it('should throw an error if the foto ID does not exist', async () => {
      const nonExistingFotoId = 9999;
      await expect(service.findFotoById(nonExistingFotoId)).rejects.toThrowError(
        'No se encontró una foto con ese ID',
      );
    });
  });

  describe('findAllFotos', () => {
    it('should return a list of fotos', async () => {
      const fotos = await service.findAllFotos();
      expect(fotos).toBeDefined();
      expect(fotos.length).toBeGreaterThan(0);
    });
  });

  describe('deleteFoto', () => {
    it('should delete a foto successfully without an associated album', async () => {
      const fotoToDelete: FotoEntity = {
        iso: 200,
        velObturacion: 5,
        apertura: 10,
        fecha: new Date(),
        id: 1,
        usuario: [],
        album: []
      };

      await expect(service.deleteFoto(fotoToDelete.id)).resolves.toBeUndefined();
    });

    it('should delete a foto and its associated album if it is the last foto', async () => {
      const fotoWithAlbumToDelete: FotoEntity = {
        iso: 200,
        velObturacion: 5,
        apertura: 10,
        fecha: new Date(),
        id: 1,
        usuario: [],
        album: [],
      };

      fotoWithAlbumToDelete.album = [
        { 
          id: 1, 
          fechaInicio: new Date(), 
          fechaFin: new Date(), 
          titulo: 'Test de album', 
          foto: [fotoWithAlbumToDelete] 
        },
      ];

      await expect(service.deleteFoto(fotoWithAlbumToDelete.id)).resolves.toBeUndefined();
      await expect(service.findAlbumById(1)).rejects.toThrowError('No se encontró un álbum con ese ID');
    });


    it('should throw an error if the foto ID does not exist', async () => {
      const nonExistingFotoId = 9999; // Replace with a non-existing foto ID
      await expect(service.deleteFoto(nonExistingFotoId)).rejects.toThrowError(
        'No se encontró una foto con ese ID',
      );
    });
  });

});
