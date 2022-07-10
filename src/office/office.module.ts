import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { officeSchema } from './models/office.schema';
import { OfficeResolver } from './office.resolver';
import { OfficeService } from './office.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Office', schema: officeSchema}])],
  providers: [OfficeResolver, OfficeService]
})
export class OfficeModule {}
