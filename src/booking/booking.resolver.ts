import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BookingService } from './booking.service';
import { BookingType } from './models/booking.dto';
import { BookingInput } from './models/booking.input';

@Resolver()
export class BookingResolver {
  constructor(
    private readonly bookingService: BookingService
  ){}

    /**
   * 
   * @returns All Reservations
   */
     @Query(() => [BookingType])
     async getAllBooking() {
       return this.bookingService.getAll()
     }
   
     /**
      * 
      * @returns Get one reservation
      */
     @Query(() => BookingType)
     async findOne(@Args('id') id: string) {
       return this.bookingService.getById(id)
     }
   
     /**
      * Add a new reservation
      * @param input 
      * @returns 
      */
     @Mutation(() => BookingType)
     async booking(@Args('carId') carId: string,@Args('officeId') officeId: string ) {
       return this.bookingService.create(carId, officeId)
     }
   
     /**
      * Delete a office
      * @param id 
      * @returns 
      */
     @Mutation(() => Boolean)
     async deleteBooking(@Args('id') id: string) {
       return this.bookingService.remove(id)
     }
   
     /**
      * 
      * @param id
      * @param input 
      * @returns 
      */
     @Mutation(() => BookingType)
     async updateBooking(@Args('id') id: string, @Args('input') input: BookingInput) {
       return this.bookingService.updateBooking(id, input)
     }
}
