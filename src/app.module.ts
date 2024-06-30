/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { ProyectoModule } from './proyecto/proyecto.module';
import { AdministradorModule } from './administrador/administrador.module';
import { PrismaService } from './prisma.service';
import { AdministradorService } from './administrador/administrador.service';

@Module({
  imports: [
    TasksModule,
    ProyectoModule,
    AdministradorModule,
  ],
  providers: [
    PrismaService,
    AdministradorService
  ],
})
export class AppModule {}
