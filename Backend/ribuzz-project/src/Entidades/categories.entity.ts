/* eslint-disable prettier/prettier */

import { Entity, PrimaryGeneratedColumn,Column, ManyToMany, JoinTable } from "typeorm";
import {Products} from "./products.entity"

@Entity({
    name: "categorias"
})

export class Categories{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string

    @ManyToMany(() => Products, (product)=>product.category)
    @JoinTable()
    products: Products[]
}