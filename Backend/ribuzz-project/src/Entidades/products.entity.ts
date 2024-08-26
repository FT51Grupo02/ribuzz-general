import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { Details } from "./details.entity";
import { Categories } from "./categories.entity";

@Entity({
    name: "products"
})
export class Products {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 250
    })
    description: string;

    @Column("simple-array", { nullable: true })
    images: string[];

    @Column("simple-array", { nullable: true })
    videos: string[];

    @Column("simple-json", { nullable: true })
    sellerInfo?: {
        name: string;
        contact: string;
    };

    @Column("simple-array", { nullable: true })
    customizationOptions?: string[];

    @Column("simple-json", { nullable: true })
    reviews?: {
        user: string;
        rating: number;
        comment: string;
    }[];

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

    @ManyToMany(() => Details, (detail) => detail.products)
    @JoinTable()
    details: Details[];

    @ManyToMany(() => Categories, (category) => category.products)
    @JoinTable()
    categories: Categories[];
}
