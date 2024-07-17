import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Unidad } from 'src/unidad/unidad.service';

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

    getAsignacionesByAnio(anio: number) {
        return this.prismaService.asignacion.findMany({
            where: { anio: anio }
        });
    }

    async getAniosAsignados(): Promise<number[]> {
        // Paso 1: Obtener todas las asignaciones
        const asignaciones = await this.prismaService.asignacion.findMany({
            select: { anio: true }
        });
    
        // Paso 2: Extraer los años de las asignaciones
        const anios = asignaciones.map(asignacion => asignacion.anio);
    
        // Paso 3: Eliminar los años duplicados
        const aniosUnicos = Array.from(new Set(anios));
    
        // Paso 4: Retornar el arreglo de años únicos
        return aniosUnicos;
    }

    async getIndicadoresByAnio(anio: number) {
        // Paso 1: Obtener todas las asignaciones del año especificado
        const asignaciones = await this.prismaService.asignacion.findMany({
            where: { anio: anio }
        });
    
        // Paso 2: Extraer los id_criterio y id_indicador de las asignaciones
        const idCriterios = asignaciones.map(asignacion => asignacion.id_criterio);
        const idIndicadores = asignaciones.map(asignacion => asignacion.id_indicador);
    
        // Paso 3: Buscar en la tabla indicador usando los id_criterio y id_indicador obtenidos
        const indicadores = await this.prismaService.indicador.findMany({
            where: {
                id_criterio: { in: idCriterios },
                id: { in: idIndicadores }
            }
        });
    
        return indicadores;
    }

    async getUnidadesByAnio(anio: number): Promise<Unidad[]> {
        // Paso 1: Obtener todas las asignaciones del año especificado
        const asignaciones = await this.prismaService.asignacion.findMany({
            where: { anio: anio }
        });
    
        // Paso 2: Extraer los id_unidad de las asignaciones
        const idUnidades = asignaciones.map(asignacion => asignacion.id_unidad);
    
        // Paso 3: Buscar en la tabla unidad usando los id_unidad obtenidos
        const unidades = await this.prismaService.unidad.findMany({
            where: {
                id: { in: idUnidades }
            }
        });
    
        return unidades;
    }

    registrarMatrizAsignaciones(asignaciones: Asignacion[]) {
        return this.prismaService.asignacion.createMany({ data: asignaciones });
    }

    createAsignacion(asignacion: Asignacion) {
        return this.prismaService.asignacion.create({ data: asignacion });
    }

    async guardarMatriz(asignaciones: Asignacion[]): Promise<void> {
        const updatePromises = asignaciones.map(asignacion => {
            const { id_unidad, id_criterio, id_indicador, anio } = asignacion;
            return this.prismaService.asignacion.update({
                where: { id_unidad_id_criterio_id_indicador_anio: { id_unidad, id_criterio, id_indicador, anio } },
                data: { recomendado: asignacion.recomendado }
            });
        });
    
        await Promise.all(updatePromises);
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

    updateRecomendadoAsignacion(anio: number, id_unidad: number, id_criterio: number, id_indicador: number, recomendado: boolean) {
        return this.prismaService.asignacion.update({
            where: { id_unidad_id_criterio_id_indicador_anio: { id_unidad, id_criterio, id_indicador, anio } },
            data: { recomendado: recomendado }
        });
    }

    updateDocRespuestaAsignacion(anio: number, id_unidad: number, id_criterio: number, id_indicador: number, doc_respuesta: string) {
        return this.prismaService.asignacion.update({
            where: { id_unidad_id_criterio_id_indicador_anio: { id_unidad, id_criterio, id_indicador, anio } },
            data: { doc_respuesta: doc_respuesta , fecha_respuesta: new Date()}
        });
    }

    deleteAsignacion(anio: number, id_unidad: number, id_criterio: number, id_indicador: number) {
        return this.prismaService.asignacion.delete({
            where: { id_unidad_id_criterio_id_indicador_anio: { id_unidad, id_criterio, id_indicador, anio } }
        });
    }

    getAsignacion(anio: number, id_unidad: number, id_criterio: number, id_indicador: number) {
        return this.prismaService.asignacion.findUnique({
            where: { id_unidad_id_criterio_id_indicador_anio: { id_unidad, id_criterio, id_indicador, anio } }
        });
    }


}
