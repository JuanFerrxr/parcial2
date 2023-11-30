import { Injectable } from '@nestjs/common';
import { FotoEntity } from './foto.entity/foto.entity';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FotoService {
    constructor(
        @InjectRepository(FotoEntity)
        private readonly fotoRepository: Repository<FotoEntity>
    ) { }

    async findAllFotos(): Promise<FotoEntity[]> {
        return await this.fotoRepository.find({ relations: ["id", "nombre", "telefono"] });
    }

    async findFotoById(id: number): Promise<FotoEntity> {
        const foto: FotoEntity = await this.fotoRepository.findOne({where: {id}, relations: ["id", "iso", "velObturacion", "apertura", "fecha"] } );
        if (!foto)
          throw new BusinessLogicException("No se encontró una foto con ese ID", BusinessError.NOT_FOUND);
        return foto;
    }

    async createFoto(foto: FotoEntity): Promise<FotoEntity> {
        if (foto.iso < 100 || foto.iso > 6400) {
            throw new BusinessLogicException("El ISO debe estar entre 100 y 6400.", BusinessError.BAD_REQUEST);
        }

        if (foto.velObturacion < 2 || foto.velObturacion > 250) {
            throw new BusinessLogicException("La velocidad de obturación debe estar entre 2 y 250.", BusinessError.BAD_REQUEST);
        }

        if (foto.apertura < 1 || foto.apertura > 32) {
            throw new BusinessLogicException("La apertura debe estar entre 1 y 32.", BusinessError.BAD_REQUEST);
        }

        const valoresarriba = [foto.iso > 3200 ? 1 : 0, foto.velObturacion > 126 ? 1 : 0, foto.apertura > 16 ? 1 : 0];
        const valoresarribatotal = valoresarriba.reduce((suma, valor) => suma + valor, 0);
        
        if (valoresarribatotal > 2) {
            throw new BusinessLogicException("Máximo 2 de estos valores deben estar por encima del valor medio de sus cotas.", BusinessError.BAD_REQUEST);
        }

        const newFoto = await this.fotoRepository.save(foto);

        return newFoto;
    }

}
