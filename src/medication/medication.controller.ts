import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { MedicationService } from './medication.service';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { AuthorizationGuard } from 'src/common/guard/authorization.guard';
import { roles } from 'src/common/utils/roles';

@Controller('medication')
export class MedicationController {
  constructor(private readonly medicationService: MedicationService) {}

  @Get()
  @UseGuards(new AuthorizationGuard([roles.CASHIER,roles.MANAGER,roles.OWNER], null, null))
  async getMedication(){
    return await this.medicationService.getMedication();
  }

  @Post('save')
  @UseGuards(new AuthorizationGuard([roles.OWNER], null, null))
  async saveMedication(@Body() createMedicationDto: CreateMedicationDto){
    return await this.medicationService.saveMedication(createMedicationDto);
  }

  @Put()
  @UseGuards(new AuthorizationGuard([roles.OWNER,roles.MANAGER,roles.CASHIER], null, null))
  async updateMedication(@Body() createMedicationDto: CreateMedicationDto){
    return await this.medicationService.saveMedication(createMedicationDto);
  }

  @Post(':id/soft-delete')
  @UseGuards(new AuthorizationGuard([roles.OWNER,roles.MANAGER], null, null))
  async softDelete(@Param('id') id: number){
    return this.medicationService.softDeleteMedication(id);
  }

  @Delete(':id/permanent-delete')
  @UseGuards(new AuthorizationGuard([roles.OWNER], null, null))
  async permanentDeleteMedication(@Param('id') id: number){
    return this.medicationService.permanentDeleteMedication(id);
  }
}
