/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { AdministradorModule } from './administrador/administrador.module';
import { PrismaService } from './prisma.service';
import { UnidadModule } from './unidad/unidad.module';
import { CriterioModule } from './criterio/criterio.module';
import { IndicadorModule } from './indicador/indicador.module';
import { AsignacionModule } from './asignacion/asignacion.module';

@Module({
  imports: [
    TasksModule,
    AdministradorModule,
    UnidadModule,
    CriterioModule,
    IndicadorModule,
    AsignacionModule,

  ],
  providers: [
    PrismaService,
  ],
})
export class AppModule {}
