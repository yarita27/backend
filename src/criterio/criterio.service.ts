import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

export interface Criterio {
    id: number;
    nombre: string;
    descripcion: string;
    estado: boolean;
}

@Injectable()
export class CriterioService {
    constructor(private prisma: PrismaService) {}

    getCriterios() {
        return this.prisma.criterio.findMany();
    }

    createCriterio(criterio: Criterio) {
        return this.prisma.criterio.create({ data: criterio });
    }

    updateCriterio(id: number, criterio: Criterio) {
        return this.prisma.criterio.update({
            where: { id: id },
            data: criterio
        });
    }

    updateEstadoCriterio(id: number, estado: boolean) {
        return this.prisma.criterio.update({
            where: { id: id },
            data: { estado: estado }
        });
    }

    deleteCriterio(id: number) {
        return this.prisma.criterio.delete({ where: { id: id } });
    }
}
