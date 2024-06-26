import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports:[
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'db/sql',
            synchronize: true,
            entities: [],
            autoLoadEntities: true,
          }),
    ]
})
export class DbConModule {}
