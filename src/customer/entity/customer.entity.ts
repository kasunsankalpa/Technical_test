import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Customer{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    first_name: string;
  
    @Column({ nullable: true })
    middle_name: string;
  
    @Column({ nullable: true })
    last_name: string;

    @Column({ nullable: true })
    mobile:string;

    @Column({ nullable: true })
    status:number
}