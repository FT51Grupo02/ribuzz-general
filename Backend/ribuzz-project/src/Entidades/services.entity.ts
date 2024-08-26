/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Users } from "./user.entity";
import { Categories } from "./categories.entity";

@Entity({
    name: "services"
})
export class Services {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false
    })
    name: string;

    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

    @Column("simple-array", { nullable: true })
    images: string[];

    @Column("simple-array", { nullable: true })
    videos: string[];

    @Column({
        type: 'decimal',
        scale: 2,
        precision: 10,
        nullable: false
    })
    price: number;

    @Column({
        type: 'float',
        nullable: true
    })
    rating: number;

    @Column({
        type: 'float',
        nullable: true
    })
    ribuzzRating: number;

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
    };

    @ManyToOne(() => Users, user => user.id)
    @JoinTable()
    provider: Users;

    @Column("simple-array", { nullable: true })
    details?: string[];

    @Column("simple-json", { nullable: true })
    reviews?: {
        username: string;
        comment: string;
        rating: number;
    }[];

    @ManyToMany(() => Categories, (category) => category.products)
    @JoinTable()
    categories: Categories[];
}
