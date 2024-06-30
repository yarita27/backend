/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { ProyectoModule } from './proyecto/proyecto.module';
import { AdministradorModule } from './administrador/administrador.module';
import { PrismaService } from './prisma.service';
import { AdministradorService } from './administrador/administrador.service';
import { UnidadModule } from './unidad/unidad.module';

@Module({
  imports: [
    TasksModule,
    ProyectoModule,
    AdministradorModule,
    UnidadModule,
  ],
  providers: [
    PrismaService,
    AdministradorService
  ],
})
export class AppModule {}
