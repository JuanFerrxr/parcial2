import {Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UsuarioEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    nombre: string;

    @Column()
    telefono: string;

}
