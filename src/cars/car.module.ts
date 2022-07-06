import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CarsResolver } from './car.resolver';
import { CarService } from './car.service';
import { CarSchema } from './models/car.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Car', schema: CarSchema}])],
  providers: [CarsResolver, CarService]
})
export class CarModule {}
