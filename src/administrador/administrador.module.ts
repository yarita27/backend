import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AdministradorController } from './administrador.controller';
import { AdministradorService } from './administrador.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AdministradorController],
  providers: [
    AdministradorService,
    PrismaService
  ]
})
export class AdministradorModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    
  }

}
