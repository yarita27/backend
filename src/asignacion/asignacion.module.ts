import { Module } from '@nestjs/common';
import { AsignacionController } from './asignacion.controller';
import { AsignacionService } from './asignacion.service';
import { PrismaService } from 'src/prisma.service';
import { UnidadModule } from 'src/unidad/unidad.module';
import { CriterioModule } from 'src/criterio/criterio.module';
import { IndicadorModule } from 'src/indicador/indicador.module';

@Module({
  imports:[
    UnidadModule,
    CriterioModule,
    IndicadorModule
  ],
  controllers: [AsignacionController],
  providers: [AsignacionService,PrismaService]
})
export class AsignacionModule {}
