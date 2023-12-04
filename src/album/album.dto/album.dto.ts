import { IsNotEmpty, IsNumber, IsString, IsDate, IsUUID } from 'class-validator';

export class AlbumDto {
    @IsUUID()
    @IsNumber()
    @IsNotEmpty()
    readonly id: number;

    @IsDate()
    @IsNotEmpty()
    readonly fechaInicio: Date;

    @IsDate()
    @IsNotEmpty()
    readonly fechaFin: Date;

    @IsString()
    @IsNotEmpty()
    readonly titulo: string;

    @IsUUID()
    readonly foto: number;

}
