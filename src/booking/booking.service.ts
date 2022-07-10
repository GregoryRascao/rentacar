import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ID } from 'graphql-ws';
import { Model } from 'mongoose';
import { catchError, from, map, Observable, throwError } from 'rxjs';
import { CarService } from '../cars/car.service';
import { BookingInput } from './models/booking.input';
import { Booking } from './models/booking.interface';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel('Booking') private readonly bookingModel: Model<Booking>,
    private readonly carService: CarService
  ) { }

  /**
   * Add a new booking to the DB
   * @param bookingDto 
   * @returns 
   */
  create(carId: string, officeId: string): Observable<any> {
    const reservation = {
      name: 'Reservation',
      carId: carId,
      officeId: officeId,
      date: new Date(Date.now())
    }
    const booking = new this.bookingModel(reservation);
    return from(this.carService.deleteCarInOffice(officeId, carId)).pipe(
      map(() => booking.save())
    )
  }

  /**
   * Search for a booking by his id
   * @param id 
   * @returns 
   */
  getById(id: ID) {
    if (id === undefined) {
      return throwError(
        new BadRequestException('The id parameter is Missing and/or Invalid'),
      );
    }
    return from(this.bookingModel.findById({ _id: id })).pipe(
      map((office) => {
        return office
      })
    )
  }

  /**
   * Get All booking in the db
   * @returns 
   */
  getAll(): Observable<Booking[]> {
    return from(this.bookingModel.find().exec()).pipe(
      map((offices) => {
        return offices
      }),
      catchError(err => {
        console.error(err);
        return throwError(err);
      }),
    )
  }

  /**
   * Update the db and remove the booking by his id
   * @param id 
   * @returns true is succeed
   */
  remove(id: string): Observable<Boolean> {
    if (id === undefined) {
      return throwError(
        new BadRequestException('The id parameter is Missing and/or Invalid'),
      );
    }
    return from(this.bookingModel.findByIdAndDelete({ _id: id })).pipe(
      map(() => {
        return true
      })
    )
  }

  /**
   * Upadte the selected office
   * @param id 
   * @param BookingType 
   * @returns 
   */
  updateBooking(id, bookingType: BookingInput): Observable<Booking> {
    return from(this.bookingModel.findOneAndUpdate({ _id: id }, bookingType))
  }
}
