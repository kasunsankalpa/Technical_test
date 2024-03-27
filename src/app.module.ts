import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbConModule } from './db_con/db_con.module';
import { UserModule } from './user/user.module';
import { CustomerModule } from './customer/customer.module';
import { MedicationModule } from './medication/medication.module';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationMiddleware } from './common/middleware/authentication.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    DbConModule, UserModule, CustomerModule, MedicationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
