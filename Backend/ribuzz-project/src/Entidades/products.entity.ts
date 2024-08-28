/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { Details } from "./details.entity";
import { Categories } from "./categories.entity";
import { Users } from "./user.entity";

@Entity({
    name: "products"
})
export class Products {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'text',
        nullable: true
    })
    name: string;

    @Column({
        type: 'decimal',
        scale: 2,
        precision: 10,
        nullable: false
    })
    price: number;

    @Column("simple-array", { nullable: true })
    images: string[];

    @Column("simple-array", { nullable: true })
    videos: string[];

    @Column({
        type: 'float',
        nullable: true
    })
    rating: number;
    
    @Column({
        type: 'varchar',
        length: 250
    })
    description: string;

    @Column({
        type: 'int',
        nullable: false
    })
    stock: number;

    @Column("simple-json", { nullable: true })
    sellerInfo?: {
        name: string;
        contact: string;
    };

    @Column("simple-json", { nullable: true })
    reviews?: {
        username: string;
        comment: string;
        rating: number;
    }[];
    
    @Column("simple-array", { nullable: true })
    details: string[];


    @ManyToOne(() => Users, user => user.id)
    @JoinTable()
    provider: Users;

    @ManyToMany(() => Details, (detail) => detail.products)
    @JoinTable()
    orderdetails: Details[];

    @ManyToMany(() => Categories, (category) => category.products)
    @JoinTable()
    categories: Categories[];
}
