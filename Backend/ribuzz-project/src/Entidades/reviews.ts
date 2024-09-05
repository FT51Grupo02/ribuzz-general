import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Products } from "./products.entity";
import { Users } from "./user.entity";



@Entity({
    name: "review"
})
export class Review {
    
@PrimaryGeneratedColumn('uuid')
id: string;


@Column()
rating: number;

@Column()
username: string;

@Column()
comment: string;

@ManyToOne(()=> Products,(product) => product.reviews)
@JoinColumn({name: 'productid'})
productId :Products;

@ManyToOne(()=> Users,(user) => user.reviews)
@JoinColumn({name: 'userid'})
userId :Users;
}