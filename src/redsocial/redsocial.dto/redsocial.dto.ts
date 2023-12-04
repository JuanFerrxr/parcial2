import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
export class RedsocialDto {

    @IsUUID()
    @IsNumber()
    @IsNotEmpty()
    readonly id: number;

    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsString()
    @IsNotEmpty()
    readonly slogan: string;

    @IsUUID()
    readonly usuario: number;
}