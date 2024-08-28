import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Products } from "./products.entity";
import { Services } from "./services.entity";

@Entity({
    name: "details_buys"
})
export class Details {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    total: number;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: true
    })
    horario?: string;

    @Column({
        type: 'varchar',
        length: 250,
        nullable: true
    })
    ubicacion?: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: true
    })
    tamaño?: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: true
    })
    color?: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: true
    })
    formato?: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: true
    })
    certificado?: string;


    @ManyToMany(() => Products, (product) => product.details)
    products: Products[];

    @ManyToMany(() => Services, (services) => services.details)
    services: Services[];
}
