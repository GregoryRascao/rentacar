import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CarService } from "./car.service";
import { CarType } from "./models/car.dto";
import { CarInput } from "./models/car.input";

@Resolver()
export class CarsResolver {
  constructor(
    private readonly carService: CarService
  ) {}

  /**
   * 
   * @returns All Cars
   */
  @Query(() => [CarType])
  async getCar() {
    return this.carService.getAll()
  }

  /**
   * 
   * @returns Get one car
   */
  @Query(() => CarType)
  async searchOne(@Args('id') id: string){
    return this.carService.getById(id)
  }

  /**
   * Add a new car
   * @param input 
   * @returns 
   */
  @Mutation(()=> CarType)
  async addCar(@Args('input') input: CarInput){
    return this.carService.create(input)
  }

  /**
   * Delete a car
   * @param id 
   * @returns 
   */
  @Mutation(()=> Boolean)
  async deleteCar(@Args('id') id: string){
    return this.carService.remove(id)
  }
}