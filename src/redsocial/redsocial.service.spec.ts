import { Test, TestingModule } from '@nestjs/testing';
import { RedsocialService } from './redsocial.service';
import { RedsocialEntity } from './redsocial.entity/redsocial.entity';

describe('RedsocialService', () => {
  let service: RedsocialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RedsocialService],
    }).compile();

    service = module.get<RedsocialService>(RedsocialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a red social', async () => {
    const redsocial = new RedsocialEntity();
    redsocial.slogan = 'Ey mor, feliz cumpleaños, el ferxoo, wouh';

    jest.spyOn(service, 'createRedSocial').mockResolvedValueOnce(redsocial);

    const result = await service.createRedSocial(redsocial);
    expect(result).toEqual(redsocial);
  });

  it('should throw an error for an empty slogan', async () => {
    const redsocial = new RedsocialEntity();
    redsocial.slogan = '';

    await expect(service.createRedSocial(redsocial)).rejects.toThrowError('El slogan no debe estar vacío.');
  });

});
