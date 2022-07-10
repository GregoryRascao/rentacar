import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookingModule } from './booking/booking.module';
import { CarModule } from './cars/car.module';
import { OfficeModule } from './office/office.module';


@Module({
  imports: [
    CarModule,
    OfficeModule,
    BookingModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    MongooseModule.forRoot('mongodb://docker:mongopw@localhost:55000'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
