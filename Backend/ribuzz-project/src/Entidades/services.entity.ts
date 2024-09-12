/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, JoinColumn, OneToMany } from "typeorm";
import { Users } from "./user.entity";
import { Categories } from "./categories.entity";
import { Details } from "./details.entity";
import { Review } from "./reviews";

@Entity({
    name: "services"
})
export class Services {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'text',
        nullable: true
    })
    name: string;

    @Column({
        type: 'decimal',
        scale: 2,
        precision: 10,
        nullable: false
    })
    price: number;

    @Column({
        type:Date,
        nullable: true
    })
    publicateDate:Date;

    @Column("simple-array", { nullable: true })
    images: string[];

    @Column("simple-array", { nullable: true })
    videos: string[];

    @Column({
        type: 'float',
        nullable: true
    })
    rating: number;
    
    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: true
    })
    duration: string;

    @Column("simple-json", { nullable: true })
    providerInfo?: {
        name: string;
        contact: string;
        location:string
    };


    @Column("simple-array", { nullable: true })
    details: string[];

    @OneToMany(()=> Review,(review) => review.serviceId)
    // @JoinColumn({name: 'reviews_id'})
    reviews :Review[]

    @ManyToOne(() => Users, user => user.id)
    @JoinTable()
    provider: Users;
    
    @ManyToMany(() => Details, (detail) => detail.service)
    @JoinColumn()
    orderdetails_service: Details[];

    @ManyToMany(() => Categories, (category) => category.products)
    @JoinTable()
    categories: Categories[];
 }
