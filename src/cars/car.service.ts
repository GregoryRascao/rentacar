import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { cp } from 'fs';
import { ID } from 'graphql-ws';
import { Model } from 'mongoose';
import { catchError, concatMap, forkJoin, from, map, merge, mergeMap, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { Office } from '../office/models/office.interface';
import { CarInput } from './models/car.input';
import { Car } from './models/car.interface';

@Injectable()
export class CarService {
  constructor(
    @InjectModel('Car') private readonly carModel: Model<Car>,
    @InjectModel('Office') private readonly officeModel: Model<Office>
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
  getById(id : ID){
    if (id === undefined) {
      return throwError(
        new BadRequestException('The id parameter is Missing and/or Invalid'),
      );
    }
    return from(this.carModel.findById({ _id: id })).pipe(
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

  /**
   * Upadte the selected car
   * @param id 
   * @param carType 
   * @returns 
   */
  updateCar(id, carType: CarInput): Observable<Car> {
    return from(this.carModel.findOneAndUpdate({ _id: id }, carType))
  }

  // Manipulation of cars on the office

  /**
   * find a car in the office
   * @param Id 
   * @returns 
   */
  findInOffice(Id: string): Observable<Car[]> {
    const sync$ = from(this.officeModel.findOne({ _id: Id })).pipe(
      concatMap((office: Office ) => {
        const obs$ = office.carsId.map((car) => {
          return from(this.carModel.findById({_id: car})).pipe(
            map((car) => car)
          );
        });
        return forkJoin(obs$);
      })
    );
    return sync$
  }

  /**
   * add a new car in the office
   * @param id 
   * @param carId 
   * @returns 
   */
  addInOffice(id, carId) {
    return from(
      this.officeModel.findOneAndUpdate(
        { _id: id },
        { $push: { carsId: carId } },
      ),
    );
  }

  /**
   * remove a car in the office
   * @param id 
   * @param carId 
   * @returns 
   */
  deleteCarInOffice(id, carId: string): Observable<Office> {
    console.log('je suis la')
    return from(this.officeModel.findOne({ _id: id })).pipe(
      concatMap(office => {
        const index = office.carsId.findIndex(
          item => item.toString() === carId,
        );
        if (index === -1) {
          throw new HttpException('Cette voiture n\'est pas dispo', 404);
        }
        office.carsId.splice(index, 1);
        return from(office.save());
      }),
    );
  }
}
