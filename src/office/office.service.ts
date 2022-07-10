import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ID } from 'graphql-ws';
import { Model } from 'mongoose';
import { catchError, from, map, Observable, throwError } from 'rxjs';
import { OfficeInput } from './models/office.input';
import { Office } from './models/office.interface';

@Injectable()
export class OfficeService {
  constructor(
    @InjectModel('Office') private readonly officeModel: Model<Office>
  ) { }

   /**
   * Add a new office to the DB
   * @param officeDto 
   * @returns 
   */
    create(officeDto: OfficeInput): Observable<Office> {
      const addOffice = new this.officeModel(officeDto);
      return from(addOffice.save());
    }
  
    /**
     * Search for a office by his id
     * @param id 
     * @returns 
     */
    getById(id : ID){
      if (id === undefined) {
        return throwError(
          new BadRequestException('The id parameter is Missing and/or Invalid'),
        );
      }
      return from(this.officeModel.findById({ _id: id })).pipe(
        map((office) => {
          return office
        })
      )
    }
  
    /**
     * Get All office in the db
     * @returns 
     */
    getAll(): Observable<Office[]> {
      return from(this.officeModel.find().exec()).pipe(
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
     * Update the db and remove the office by his id
     * @param id 
     * @returns true is succeed
     */
    remove(id: string): Observable<Boolean> {
      if (id === undefined) {
        return throwError(
          new BadRequestException('The id parameter is Missing and/or Invalid'),
        );
      }
      return from(this.officeModel.findByIdAndDelete({ _id: id })).pipe(
        map(() => {
          return true
        })
      )
    }
  
    /**
     * Upadte the selected office
     * @param id 
     * @param officeType 
     * @returns 
     */
    updateOffice(id, officeType: OfficeInput): Observable<Office> {
      return from(this.officeModel.findOneAndUpdate({ _id: id }, officeType))
    }
}
