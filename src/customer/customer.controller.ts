import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { AuthorizationGuard } from 'src/common/guard/authorization.guard';
import { roles } from 'src/common/utils/roles';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  @UseGuards(new AuthorizationGuard([roles.CASHIER,roles.MANAGER,roles.OWNER], null, null))
  async getCustomers(){
    return await this.customerService.getCustomers();
  }

  @Post('save')
  @UseGuards(new AuthorizationGuard([roles.OWNER], null, null))
  async saveCustomer(@Body() createCustomerDto:CreateCustomerDto){
    return await this.customerService.saveCustomer(createCustomerDto);
  }

  @Put()
  @UseGuards(new AuthorizationGuard([roles.OWNER,roles.MANAGER,roles.CASHIER], null, null))
  async updateCustomer(@Body() createCustomerDto:CreateCustomerDto){
    // console.log(createCustomerDto);
    return await this.customerService.saveCustomer(createCustomerDto);
  }

  @Post(':id/soft-delete')
  @UseGuards(new AuthorizationGuard([roles.OWNER,roles.MANAGER], null, null))
  async softDelete(@Param('id') id: number){
    return await this.customerService.softDeleteCustomer(id);
  }

  @Delete(':id/permanent-delete')
  @UseGuards(new AuthorizationGuard([roles.OWNER], null, null))
  async permanentDeleteMedication(@Param('id') id: number){
    return await this.customerService.permanentDeleteCustomer(id);
  }
}
