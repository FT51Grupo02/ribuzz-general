import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Products } from "./products.entity";

@Entity({
    name: "categories"
})
export class Categories {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @ManyToMany(() => Products, (product) => product.categories)
    @JoinTable()
    products: Products[];
}
