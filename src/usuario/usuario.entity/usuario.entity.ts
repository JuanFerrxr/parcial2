import { FotoEntity } from 'src/foto/foto.entity/foto.entity';
import { RedsocialEntity } from 'src/redsocial/redsocial.entity/redsocial.entity';
import {Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UsuarioEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    nombre: string;

    @Column()
    telefono: string;

    @OneToMany(() => FotoEntity, foto => foto.usuario)
    foto: FotoEntity[];

    @OneToMany(() => RedsocialEntity, redsocial => redsocial.usuario)
    redsocial: RedsocialEntity[];

}
