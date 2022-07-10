import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ID } from "graphql-ws";
import { OfficeType } from "../office/models/office.dto";
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

  /**
   * 
   * @param id
   * @param input 
   * @returns 
   */
  @Mutation(() => CarType)
  async updateCar(@Args('id') id: string, @Args('input') input: CarInput){
    return this.carService.updateCar(id, input)
  }

  @Query(() => [CarType])
  async findInOffice(@Args('id') id: string) {
    return this.carService.findInOffice(id)
  }

  @Mutation(() => OfficeType)
  async addInOffice(@Args('id') id: string, @Args('carId') carId: string){
    return this.carService.addInOffice(id, carId)
  }

  @Mutation(()=> OfficeType)
  async removeCarInOffice(@Args('id') id: string, @Args('carId') carId: string){
    return this.carService.deleteCarInOffice(id, carId);
  }
}