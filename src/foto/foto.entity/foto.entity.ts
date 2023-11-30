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

}
