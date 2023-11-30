import {Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
}
