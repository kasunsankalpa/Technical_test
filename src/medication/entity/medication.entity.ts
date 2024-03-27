import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Medication{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    description:string;

    @Column({ nullable: false })
    qty:number;

    @Column({ nullable: true })
    status:number
}