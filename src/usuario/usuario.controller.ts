import { Body, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { plainToInstance } from 'class-transformer';
import { UsuarioEntity } from './usuario.entity/usuario.entity';
import { UsuarioDto } from './usuario.dto/usuario.dto';

@UseInterceptors(BusinessErrorsInterceptor)
@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}

    @Get()
    async findAllUsuarios() {
      return await this.usuarioService.findAllUsuarios();
    }

    @Get(':usuarioId')
    async findUsuarioById(@Param('usuarioId') usarioId: number) {
      return await this.usuarioService.findUsuarioById(usarioId);
    }

    @Post()
    async create(@Body() usuarioDto: UsuarioDto) {
      const usuario: UsuarioEntity = plainToInstance(UsuarioEntity, usuarioDto);
      return await this.usuarioService.createUsuario(usuario);
    }
}
