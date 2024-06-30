import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

export interface Unidad {
    id: number;
    nombre: string;
    responsable: string;
    correo: string;
    contrasena: string;
}

@Injectable()
export class UnidadService {

    constructor(private prisma: PrismaService) {}

    getUnidades() {
        return this.prisma.unidad.findMany();
    }

    createUnidad(unidad : Unidad) {
        return this.prisma.unidad.create({
            data: unidad
        });
    }

    deleteUnidad(id: number) {
        return this.prisma.unidad.delete({
            where: {id: id}
        });
    }
}
