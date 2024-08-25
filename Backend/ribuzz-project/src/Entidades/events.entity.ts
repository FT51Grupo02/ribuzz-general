/* eslint-disable prettier/prettier */
import { Entity,Column,PrimaryGeneratedColumn, ManyToMany, JoinColumn } from "typeorm";
import {Users} from "./user.entity"

@Entity({
    name:"eventos"
})

export class Events{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    name:string;

    @ManyToMany(() => Users, (user)=>user.id)
    @JoinColumn()
    users: Users[]
}