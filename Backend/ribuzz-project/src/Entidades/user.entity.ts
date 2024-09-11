/* eslint-disable prettier/prettier */
import { Column, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Events } from "./events.entity";
import {Orders} from "./orders.entity"
import { Review } from "./reviews";

@Entity({
    name:"users"
})

export class Users{
    @PrimaryGeneratedColumn('uuid')
    id: string;

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

    @Column('jsonb',{nullable:true})
    questions: Record<string,any>

    @ManyToMany(()=>Events)
    events: Events[]

    @OneToMany(()=> Orders,(order) => order.user)
    @JoinColumn({name: 'ordersid'})
    orders :Orders[];

    @OneToMany(()=> Review,(users) => users.userId)
    reviews :Review[]

}
