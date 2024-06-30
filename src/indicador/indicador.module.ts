import { Module } from '@nestjs/common';
import { IndicadorController } from './indicador.controller';
import { IndicadorService } from './indicador.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [IndicadorController],
  providers: [IndicadorService,PrismaService]
})
export class IndicadorModule {}
