import { FotoEntity } from 'src/foto/foto.entity/foto.entity';
import {Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AlbumEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    fechaInicio: Date;

    @Column()
    fechaFin: Date;

    @Column()
    titulo: string;

    @OneToMany(() => FotoEntity, foto => foto.album)
    foto: FotoEntity[];

}
