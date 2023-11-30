import { AlbumEntity } from 'src/album/album.entity/album.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity/usuario.entity';
import {Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FotoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    iso: number;

    @Column()
    velObturacion: number;

    @Column()
    apartura: number;

    @Column()
    fecha: Date;

    @OneToMany(() => UsuarioEntity, usuario => usuario.foto)
    usuario: UsuarioEntity[];

    @ManyToMany(() => AlbumEntity, album => album.foto)
    album: AlbumEntity[];

}
