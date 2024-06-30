import { Module } from '@nestjs/common';
import { UnidadController } from './unidad.controller';
import { UnidadService } from './unidad.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [UnidadController],
  providers: [UnidadService,PrismaService]
})
export class UnidadModule {

}
