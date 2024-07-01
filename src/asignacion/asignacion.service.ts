import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

export interface Asignacion {
    anio: number;
    id_unidad: number;
    id_criterio: number;
    id_indicador: number;
    recomendado: boolean;
    doc_respuesta: string | null;
    fecha_respuesta: Date | null;
    completado: boolean;

}

  

@Injectable()
export class AsignacionService {
    constructor(private prismaService: PrismaService) {}

    getAsignaciones() {
        return this.prismaService.asignacion.findMany();
    }

    createAsignacion(asignacion: Asignacion) {
        return this.prismaService.asignacion.create({ data: asignacion });
    }

    updateAsignacion(anio: number, id_unidad: number, id_criterio: number, id_indicador: number, asignacion: Asignacion) {
        return this.prismaService.asignacion.update({
            where: { id_unidad_id_criterio_id_indicador_anio: { id_unidad, id_criterio, id_indicador, anio } },
            data: asignacion
        });
    }

    updateEstadoAsignacion(anio: number, id_unidad: number, id_criterio: number, id_indicador: number, completado: boolean) {
        return this.prismaService.asignacion.update({
            where: { id_unidad_id_criterio_id_indicador_anio: { id_unidad, id_criterio, id_indicador, anio } },
            data: { completado: completado }
        });
    }

    deleteAsignacion(anio: number, id_unidad: number, id_criterio: number, id_indicador: number) {
        return this.prismaService.asignacion.delete({
            where: { id_unidad_id_criterio_id_indicador_anio: { id_unidad, id_criterio, id_indicador, anio } }
        });
    }


}
