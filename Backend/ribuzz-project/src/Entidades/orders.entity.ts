/* eslint-disable prettier/prettier */
import { Entity, Column,PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from "typeorm";
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

    @Column(
        { nullable: true,}
    )
    pay:string;

    @ManyToOne(()=>Users, (user)=>user.id)
    @JoinColumn()
    user:Users

    @OneToOne(() => Details)
    @JoinColumn()
    detail:Details

}