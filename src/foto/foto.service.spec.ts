import { Test, TestingModule } from '@nestjs/testing';
import { FotoService } from './foto.service';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';
import { FotoEntity } from './foto.entity/foto.entity';
import { Repository } from 'typeorm';

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
    it('should create a foto successfully for valid input', async () => {
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

    it('should throw BusinessLogicException for invalid ISO', async () => {
      const invalidFoto: FotoEntity = {
        iso: 7000,
        velObturacion: 5,
        apertura: 10,
        fecha: new Date(),
        id: 0,
        usuario: [],
        album: []
      };

      await expect(service.createFoto(invalidFoto)).rejects.toThrowError(
        new BusinessLogicException('El ISO debe estar entre 100 y 6400.', BusinessError.BAD_REQUEST)
      );
    });

    it('should throw BusinessLogicException for too many values above the median', async () => {
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
});
