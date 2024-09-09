/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Products } from "./products.entity";
import { Services } from "./services.entity";
import { Events} from "./events.entity"

@Entity({
    name: "categories"
})
export class Categories {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @ManyToMany(() => Products, (product) => product.categories)
    products: Products[];
    
    @ManyToMany(() => Services, (services) => services.categories)
    services: Services[];

    @ManyToMany(() => Services, (services) => services.categories)
    events: Events[];
}
