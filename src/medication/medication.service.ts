import { Injectable } from '@nestjs/common';
import { Medication } from './entity/medication.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { DeleteMedicationDto } from './dto/delete-medication.dto';

@Injectable()
export class MedicationService {
    constructor(
        @InjectRepository(Medication) private readonly medicationRepo: Repository<Medication>,
    ){}

    async saveMedication(createMedicationDto:CreateMedicationDto){
        try {
            createMedicationDto.status=1;
            const medication:Medication = await this.medicationRepo.save(createMedicationDto);
            if(medication){
                return {success:true, message:'medication saved successfully'}
            }else{
                return {error:true, message:'medication save error'}
            }
        } catch (error) {
            return {error:true, message:'medication save error '}
        }
    }

    async getMedication(){
        return await this.medicationRepo.find();
    }

    async softDeleteMedication(id:number){
        try {
            const medication:Medication = await this.medicationRepo.findOne({where:{id:id}});
            if(medication){
                const result = await this.medicationRepo.update({id:id}, {status:3});
               if(result){
                return {success:true,message:'soft delete medication success'}
               }else{
                return {error:true,message:'soft delete medication fail'}
               }
            }else{
                return {error:true, message:'medication not found'}
            }
            
        } catch (error) {
            return {error:true,message:'soft delete medication fail'}
        }
       
    }

    async permanentDeleteMedication(id:number){
        try {
            const result = await this.medicationRepo.delete({id:id});
            if(result){
                return {success:true,message:'medication delete success'}
            }else{
                return {error:true,message:' medication delete fail'}
            }
        } catch (error) {
            return {error:true,message:' medication delete fail'}
        }
        
    }
}
