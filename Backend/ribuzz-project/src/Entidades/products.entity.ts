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
        type:'varchar',
        length:100,
        nullable: true
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 250
    })
    description: string;

    @Column("simple-array", { nullable: true })
    images: string[];

    @Column("simple-array", { nullable: true })
    videos: string[];

    @Column({
        type: 'decimal',
        scale: 2,
        precision: 10,
        nullable: false
    })
    price: number;

    @Column({
        type: 'int',
        nullable: false
    })
    stock: number;

    @Column({
        type: 'float',
        nullable: true
    })
    rating: number;

    @Column("simple-json", { nullable: true })
    providerInfo?: {
        name: string;
        contact: string;
    };

    @Column("simple-array", { nullable: true })
    customizationOptions?: string[];

    @Column("simple-json", { nullable: true })
    reviews?: {
        username: string;
        comment: string;
        rating: number;
    }[];

    @ManyToOne(() => Users, user => user.id)
    @JoinTable()
    provider: Users;

    @ManyToMany(() => Details, (detail) => detail.products)
    @JoinTable()
    details: Details[];

    @ManyToMany(() => Categories, (category) => category.products)
    @JoinTable()
    categories: Categories[];
}
