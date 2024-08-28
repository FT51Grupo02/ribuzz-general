/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToOne, JoinColumn } from "typeorm";
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
    Horario?: string;

    @Column({
        type: 'varchar',
        length: 250,
        nullable: true
    })
    Ubicación?: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: true
    })
    Tamaño?: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: true
    })
    Color?: string;


    @ManyToMany(() => Products, (product) => product.orderdetails)
    products: Products[];

    @ManyToMany(() => Services, (services) => services.details)
    services: Services[];

    @OneToOne(() => Orders,(order) => order.orderDetails )
    @JoinColumn({name: 'order_id'})
    order: Orders;
}
