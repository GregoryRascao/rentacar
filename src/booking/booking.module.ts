import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CarService } from '../cars/car.service';
import { CarSchema } from '../cars/models/car.schema';
import { officeSchema } from '../office/models/office.schema';
import { BookingResolver } from './booking.resolver';
import { BookingService } from './booking.service';
import { BookingSchema } from './models/booking.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Booking', schema: BookingSchema}]),
    MongooseModule.forFeature([{name: 'Car', schema: CarSchema}]),
    MongooseModule.forFeature([{ name: 'Office', schema: officeSchema }]),
  ],
  providers: [BookingResolver, BookingService, CarService]
})
export class BookingModule {}
