import { Injectable } from '@nestjs/common';
import { PrismaService} from 'src/prisma.service';

export interface Indicador {
    id_criterio: number,
    id: number;
    nombre: string;
    descripcion: string;
    doc_pregunta: string;
    estado: boolean;

}

@Injectable()
export class IndicadorService {
    constructor(private prisma: PrismaService) {}

    getIndicadores() {
        return this.prisma.indicador.findMany();
    }

    createIndicador(indicador: Indicador) {
        return this.prisma.indicador.create({ data: indicador });
    }

    deleteIndicador(id_criterio: number, id: number) {
        return this.prisma.indicador.delete({ where: { id_criterio: id_criterio , id: id } });
    }
    
}
