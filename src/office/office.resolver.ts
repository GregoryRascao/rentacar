import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { OfficeType } from './models/office.dto';
import { OfficeInput } from './models/office.input';
import { OfficeService } from './office.service';

@Resolver()
export class OfficeResolver {
  constructor(
    private readonly officeService: OfficeService
  ) { }

  /**
   * 
   * @returns All offices
   */
  @Query(() => [OfficeType])
  async getOffice() {
    return this.officeService.getAll()
  }

  /**
   * 
   * @returns Get one office
   */
  @Query(() => OfficeType)
  async findOne(@Args('id') id: string) {
    return this.officeService.getById(id)
  }

  /**
   * Add a new office
   * @param input 
   * @returns 
   */
  @Mutation(() => OfficeType)
  async addOffice(@Args('input') input: OfficeInput) {
    return this.officeService.create(input)
  }

  /**
   * Delete a office
   * @param id 
   * @returns 
   */
  @Mutation(() => Boolean)
  async deleteOffice(@Args('id') id: string) {
    return this.officeService.remove(id)
  }

  /**
   * 
   * @param id
   * @param input 
   * @returns 
   */
  @Mutation(() => OfficeType)
  async updateOffice(@Args('id') id: string, @Args('input') input: OfficeInput) {
    return this.officeService.updateoffice(id, input)
  }
}
