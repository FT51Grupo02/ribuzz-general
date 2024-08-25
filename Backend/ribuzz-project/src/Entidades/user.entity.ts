/* eslint-disable prettier/prettier */
import { Column, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Events } from "./events.entity";
import {Orders} from "./orders.entity"

@Entity({
    name:"usuario"
})

export class Users{
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    name: string;

    @Column()
    email:string;

    @Column()
    password:string;

    @Column()
    date:Date;

    @Column()
    rol:string;

    @Column({
        nullable:true
    })
    photo:string

    @ManyToMany(()=>Events)
    @JoinColumn()
    events: Events[]

    @OneToMany(()=>Orders, (order)=>order.id)
    @JoinColumn()
    order: Orders[]

}
