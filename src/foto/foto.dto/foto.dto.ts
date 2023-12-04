import { IsDate, IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
export class FotoDto {

    @IsUUID()
    @IsNumber()
    @IsNotEmpty()
    readonly id: number;

    @IsNumber()
    @IsNotEmpty()
    readonly iso: number;

    @IsNumber()
    @IsNotEmpty()
    readonly velObturacion: number;

    @IsNumber()
    @IsNotEmpty()
    readonly apertura: number;

    @IsDate()
    @IsNotEmpty()
    readonly fecha: Date;;

    @IsUUID()
    readonly usuario: number;

    @IsUUID()
    readonly album: number;
}

