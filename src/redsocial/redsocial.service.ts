import { Injectable } from '@nestjs/common';
import { RedsocialEntity } from './redsocial.entity/redsocial.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RedsocialService {
        constructor(
        @InjectRepository(RedsocialEntity)
        private readonly redsocialRepository: Repository<RedsocialEntity>
    ) { }

    async createRedSocial(redsocial: RedsocialEntity): Promise<RedsocialEntity> {
        if (redsocial.slogan.length == 0) {
            throw new Error('El slogan no debe estar vacío.');
        }
        if (redsocial.slogan.length <= 20) {
            throw new Error('El slogan debe tener mínimo 20 caracteres.');
        }
        return await this.redsocialRepository.save(redsocial);
    }
}
