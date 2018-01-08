import {Column, PrimaryGeneratedColumn, Entity} from "typeorm";

@Entity()
export class Blog {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    author: string;

}
