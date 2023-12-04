import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class UsuarioDto {
    @IsUUID()
    @IsNumber()
    @IsNotEmpty()
    readonly id: number;

    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsString()
    @IsNotEmpty()
    readonly telefono: string;

    @IsUUID()
    readonly foto: number;

    @IsUUID()
    readonly redsocial: number;

}
