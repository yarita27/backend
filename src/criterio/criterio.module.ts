import { Module } from '@nestjs/common';
import { CriterioController } from './criterio.controller';
import { CriterioService } from './criterio.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CriterioController],
  providers: [CriterioService,PrismaService]
})
export class CriterioModule {}
