/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinColumn } from "typeorm";
import { Products } from "./products.entity";


@Entity({
    name: "detalle"
})

export class Details{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    total: number

    @ManyToMany(() => Products, (product)=>product.id)
    @JoinColumn()
    products: Products[]
}
