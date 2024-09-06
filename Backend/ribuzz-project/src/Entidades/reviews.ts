import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Events } from "./events.entity";
import { Products } from "./products.entity";
import { Services } from "./services.entity";
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

@ManyToOne(()=> Events,(event) =>event.reviews )
@JoinColumn({name: 'eventid'})
eventId :Events;

@ManyToOne(()=> Services,(service) => service.reviews)
@JoinColumn({name: 'serviceid'})
serviceId :Services;

@ManyToOne(()=> Users,(user) => user.reviews)
@JoinColumn({name: 'userid'})
userId :Users;
}