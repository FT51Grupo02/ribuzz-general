/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToOne, JoinColumn } from "typeorm";
import { Orders } from "./orders.entity";
import { Products } from "./products.entity";
import { Services } from "./services.entity";

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

    @ManyToMany(() => Services, (services) => services.details)
    services: Services[];

    @OneToOne(() => Orders,(order) => order.orderDetails )
    @JoinColumn({name: 'order_id'})
    order: Orders;
}
