/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { ProyectoModule } from './proyecto/proyecto.module';
import { AdministradorModule } from './administrador/administrador.module';
import { PrismaService } from './prisma.service';
import { UnidadModule } from './unidad/unidad.module';
import { CriterioModule } from './criterio/criterio.module';
import { IndicadorModule } from './indicador/indicador.module';

@Module({
  imports: [
    TasksModule,
    ProyectoModule,
    AdministradorModule,
    UnidadModule,
    CriterioModule,
    IndicadorModule,

  ],
  providers: [
    PrismaService,
  ],
})
export class AppModule {}
