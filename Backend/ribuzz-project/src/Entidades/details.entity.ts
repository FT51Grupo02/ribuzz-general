/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToOne, JoinTable, JoinColumn } from "typeorm";
import { Events } from "./events.entity";
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

             
    @ManyToMany(()=> Products)
    @JoinTable({name: 'DETAILS_ORDER_PRODUCTS'})
    products :Products[]

    @ManyToMany(()=> Services)
    @JoinTable({name: 'DETAILS_ORDER_SERVICE'})
    service :Services[]

    @ManyToMany(()=> Events)
    @JoinTable({name: 'DETAILS_ORDER_EVENTS'})
    events :Events[]

    @OneToOne(() => Orders,(order) => order.Details )
    @JoinColumn({name: 'order_id'})
    order: Orders;
}  
