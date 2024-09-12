/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, JoinTable, OneToMany } from 'typeorm';
import { Details } from './details.entity';
import { Categories } from './categories.entity';
import { Users } from './user.entity';
import { Review } from './reviews';


@Entity({
    name: "products"
})
export class Products {
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
        type: 'varchar',
        length: 250
    })
    description: string;

    @Column({
        type:'varchar',
        nullable:true
    })
    publicateDate:string 

    @Column({
        type: 'int',
        nullable: false
    })
    stock: number;

    @Column("simple-json", { nullable: true })
    sellerInfo?: {
        name: string;
        contact: string;
    };

    // @Column("simple-json", { nullable: true })
    // reviews?: {
    //     username: string;
    //     comment: string;
    //     rating: number;
    // }[];
    
    @Column("simple-array", { nullable: true })
    details: string[];

    @ManyToOne(() => Users, user => user.id)
    provider: Users;

    @ManyToMany(() => Details, (orderDetails) => orderDetails.products)
    orderDetails: Details[];

    @ManyToMany(() => Categories, (category) => category.products, { cascade: true })
    @JoinTable({name: 'products_categories'})
    categories: Categories[];

    @OneToMany(()=> Review,(users) => users.productId)
    // @JoinColumn({name: 'reviews_id'})
    reviews :Review[]
}
