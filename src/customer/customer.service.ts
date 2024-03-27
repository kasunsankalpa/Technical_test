import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entity/customer.entity';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer) private readonly customerRepo: Repository<Customer>,
    ){}


    async saveCustomer(createCustomerDto:CreateCustomerDto){

        try {
            createCustomerDto.status=1;
            const customer:Customer = await this.customerRepo.save(createCustomerDto);
            if(customer){

                return {success:true, message:'customer registered successfully'};
            }else{
                return {error:true, message:'customer save error '};
            }
            
        } catch (error) {
            return {error:true, message:'customer save error '};
        }

    }

    async getCustomers(){
        return await this.customerRepo.find();
    }

    async softDeleteCustomer(id:number){
        try {
            const customer:Customer = await this.customerRepo.findOne({where:{id:id}});
            if(customer){
                const result = await this.customerRepo.update({id:id}, {status:3});
               if(result){
                return {success:true,message:'soft delete customer success'}
               }else{
                return {error:true,message:'soft delete customer fail'}
               }
            }else{
                return {error:true, message:'customer not found'}
            }
            
        } catch (error) {
            return {error:true,message:'soft delete customer fail'}
        }
    }

    async permanentDeleteCustomer(id:number){
        try {
            const result = await this.customerRepo.delete({id:id});
            if(result){
                return {success:true,message:'customer delete success'}
            }else{
                return {error:true,message:' customer delete fail'}
            }
        } catch (error) {
            return {error:true,message:' customer delete fail'}
        }
        
    }
}
