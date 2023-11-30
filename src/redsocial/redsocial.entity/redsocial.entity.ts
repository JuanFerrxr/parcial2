import {Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RedsocialEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    nombre: string;

    @Column()
    slogan: string;
}
