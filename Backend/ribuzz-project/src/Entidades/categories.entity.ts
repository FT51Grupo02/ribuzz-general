/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Products } from "./products.entity";
import { Services } from "./services.entity";

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
    
    // @ManyToMany(() => Services, (services) => services.categories)
    // @JoinTable()
    // services: Services[];
}
