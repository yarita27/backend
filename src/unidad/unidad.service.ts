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

    getUnidadById(id: number) {
        return this.prisma.unidad.findUnique({
            where: {id: id}
        });
    }

    unidadesActivas(){
        return this.prisma.unidad.findMany({ where: { estado: true } });
    }


    createUnidad(unidad : Unidad) {
        return this.prisma.unidad.create({
            data: unidad
        });
    }

    updateUnidad(id: number, unidad: Unidad) {
        return this.prisma.unidad.update({
            where: {id: id},
            data: unidad
        });
    }

    updateEstadoUnidad(id: number, estado: boolean) {
        return this.prisma.unidad.update({
            where: {id: id},
            data: {estado: estado}
        });
    }

    deleteUnidad(id: number) {
        return this.prisma.unidad.delete({
            where: {id: id}
        });
    }
}
