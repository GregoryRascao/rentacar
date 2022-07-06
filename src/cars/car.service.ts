import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { catchError, from, map, Observable, throwError } from 'rxjs';
import { CarInput } from './models/car.input';
import { Car } from './models/car.interface';

@Injectable()
export class CarService {
  constructor(
    @InjectModel('Car') private readonly carModel: Model<Car>
  ) { }

  /**
   * Add a new car to the DB
   * @param carDto 
   * @returns 
   */
  create(carDto: CarInput): Observable<Car> {
    const addCar = new this.carModel(carDto);
    return from(addCar.save());
  }

  /**
   * Search for a car by his id
   * @param id 
   * @returns 
   */
  getById(id : string){
    if (id === undefined) {
      return throwError(
        new BadRequestException('The id parameter is Missing and/or Invalid'),
      );
    }
    return from(this.carModel.find({ _id: id })).pipe(
      map((car) => {
        return car
      })
    )
  }

  /**
   * Get All car in the db
   * @returns 
   */
  getAll(): Observable<Car[]> {
    return from(this.carModel.find().exec()).pipe(
      map((cars) => {
        return cars
      }),
      catchError(err => {
        console.error(err);
        return throwError(err);
      }),
    )
  }

  /**
   * Update the db and remove the car by his id
   * @param id 
   * @returns true is succeed
   */
  remove(id: string): Observable<Boolean> {
    if (id === undefined) {
      return throwError(
        new BadRequestException('The id parameter is Missing and/or Invalid'),
      );
    }
    return from(this.carModel.findByIdAndDelete({ _id: id })).pipe(
      map(() => {
        return true
      })
    )
  }
}
