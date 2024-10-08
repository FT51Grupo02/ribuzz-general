/* eslint-disable prettier/prettier */
import { Entity, Column,PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import {Users} from "./user.entity"
import { Details } from "./details.entity";

@Entity({
    name:"orders"
})

export class Orders{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    date:Date

    @Column({
        nullable: true,
    })
    pay: string;

    @ManyToOne(()=> Users,(users) => users.orders)
    @JoinColumn({name: 'user_id'})
    user :Users

    @OneToOne(() => Details,(orderDetails) => orderDetails.order )
   Details: Details[];
    
}