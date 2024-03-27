import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    first_name: string;
  
    @Column({ nullable: true })
    middle_name: string;
  
    @Column({ nullable: true })
    last_name: string;

    @Column({ nullable: true })
    email:string;

    @Column({ nullable: true })
    mobile:string;

    @Column({ nullable: false , unique: true })
    user_name: string;

    @Column({ nullable: false })
    password: string;
    
    @Column({ nullable: true })
    status:number;

    @Column({ nullable: false })
    role:string;
}