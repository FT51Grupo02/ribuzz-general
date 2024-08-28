/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { Details } from "./details.entity";
import { Categories } from "./categories.entity";
import { Users } from "./user.entity";

@Entity({
    name: "events"
})
export class Events {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type:'varchar',
        length:100,
        nullable: true
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 250,
        nullable:true
    })
    description: string;

    @Column("simple-array", { nullable: true })
    images: string[];

    @Column("simple-array", { nullable: true })
    videos: string[];


    @Column("varchar",{length:15, nullable: true  })
    date:string
  
    @Column("varchar",{length:100, })
    location:string

    @Column("simple-array", { nullable: true })
    time: string[];


    @Column({
        type: 'decimal',
        scale: 2,
        precision: 10,
        nullable: false
    })
    price: number;

    @Column({
        type: 'int',
        nullable: false
    })
    stock: number;

    @Column({
        type: 'float',
        nullable: true
    })
    rating: number;

    @Column("simple-json", { nullable: true })
    ProviderInfo?: {
        name: string;
        contact: string;
    };


    @Column("simple-json", { nullable: true })
    reviews?: {
        username: string;
        comment: string;
        rating: number;
    }[];

    @ManyToMany(() => Users, user => user.id)
    @JoinTable()
    provider: Users;


}
