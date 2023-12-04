import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from './usuario.service';
import { UsuarioEntity } from './usuario.entity/usuario.entity';

describe('UsuarioService', () => {
  let service: UsuarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuarioService],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUsuario', () => {
    it('should create a user', async () => {
      const usuarioToCreate: UsuarioEntity = {
        id: 1, 
        nombre: 'Cristiano Ronaldo', 
        telefono: '1234567890', 
        foto: [], 
        redsocial: []
      };
      const createdUsuario = await service.createUsuario(usuarioToCreate);
      expect(createdUsuario.id).toBeDefined();
      expect(createdUsuario.telefono).toBe('1234567890');
    });

    it('should throw an error if phone number length is not 10', async () => {
      const usuarioToCreate: UsuarioEntity = {
        id: 2,
        nombre: 'Lionel Messi', 
        telefono: '11111', 
        foto: [], 
        redsocial: []
      };
      await expect(service.createUsuario(usuarioToCreate)).rejects.toThrowError('El teléfono debe tener 10 caracteres.');
    });
  });

  describe('findUsuarioById', () => {
    it('should find an existing user', async () => {
      const existingUsuarioId = 1; 
      const foundUsuario = await service.findUsuarioById(existingUsuarioId);
      expect(foundUsuario).toBeDefined();
    });

    it('should throw an error if the user ID does not exist', async () => {
      const nonExistingUsuarioId = 9999
      await expect(service.findUsuarioById(nonExistingUsuarioId)).rejects.toThrowError(
        'No se encontró un usuario con ese ID',
      );
    });
  });

  describe('findAllUsuarios', () => {
    it('should return a list of users', async () => {
      const usuarios = await service.findAllUsuarios();
      expect(usuarios).toBeDefined();
      expect(usuarios.length).toBeGreaterThan(0);
    });
  });

});
