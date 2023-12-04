import { Body, Controller, Post, UseInterceptors} from '@nestjs/common';
import { RedsocialService } from './redsocial.service';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { RedsocialEntity } from './redsocial.entity/redsocial.entity';
import { RedsocialDto } from './redsocial.dto/redsocial.dto';
import { plainToInstance } from 'class-transformer';

@UseInterceptors(BusinessErrorsInterceptor)
@Controller('redsocial')
export class RedsocialController {
    constructor(private readonly redsocialService: RedsocialService) {}

    @Post()
    async create(@Body() redsocialDto: RedsocialDto) {
      const museum: RedsocialEntity = plainToInstance(RedsocialEntity, redsocialDto);
      return await this.redsocialService.createRedSocial(museum);
    }
    
}
