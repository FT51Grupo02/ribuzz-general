/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToOne, JoinTable } from "typeorm";
import { Orders } from "./orders.entity";
import { Products } from "./products.entity";
import { Services } from "./services.entity";

@Entity({
    name: "details_buys"
})
export class Details {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    total: number;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: true
    })
    schudule?: string;

    @Column({
        type: 'varchar',
        length: 250,
        nullable: true
    })
    ubication?: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: true
    })
    size?: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: true
    })
    color?: string;

    @ManyToMany(() => Products, (product) => product.details)
    @JoinTable()
    products: Products[];

    @ManyToMany(() => Services, (services) => services.details)
    services: Services[];

    @OneToOne(() => Orders,(order) => order.orderDetails )
    order: Orders;
}
