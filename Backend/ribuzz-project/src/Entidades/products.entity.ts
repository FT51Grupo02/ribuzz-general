/* eslint-disable prettier/prettier */
import { Entity, Column,PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { Details } from "./details.entity";
import {Categories} from "./categories.entity"

@Entity({
    name: "productos"
})

export class Products{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({
        type:'varchar',
        length:250
    })
    description:string

    @Column()
    img:string
    
    @Column({
        type:'decimal',
        scale:2,
        precision:10,
        nullable: false
    })
    price: number

    @Column({
        type:'int',
        nullable:false
    })
    stock: number


    @ManyToMany(()=> Details, (detail)=>detail.id)
    @JoinTable()
    detail:Details[]

    @ManyToMany(()=> Categories, (category)=>category.products)
    @JoinTable()
    category: Categories[]

}