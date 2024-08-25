import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Products } from "./products.entity";

@Entity({
    name: "details"
})
export class Details {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    total: number;

    @ManyToMany(() => Products, (product) => product.details)
    products: Products[];
}
