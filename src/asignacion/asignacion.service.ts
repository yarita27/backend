import { Injectable } from '@nestjs/common';
import { get } from 'http';
import { PrismaService } from 'src/prisma.service';
import { Unidad } from 'src/unidad/unidad.service';
import { getYear as getYearFromFns } from 'date-fns/getYear';


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

    async duplicarMatrizByAnio(anio: number): Promise<void> {
        // Obtener todas las asignaciones del año especificado
        const asignaciones = await this.prismaService.asignacion.findMany({
          where: { anio },
        });
    
        // Crear nuevas asignaciones para el año actual
        const anioActual = getYear(new Date());
        const nuevasAsignaciones = asignaciones.map(asignacion => ({
          ...asignacion,
          anio: anioActual,
        }));
    
        await this.prismaService.asignacion.createMany({
          data: nuevasAsignaciones,
        });
    }

async duplicarMatrizExistente(anio: number): Promise<void> {
    // Obtener todas las asignaciones del año especificado
    const asignacionesAnioAnterior = await this.prismaService.asignacion.findMany({
      where: { anio },
    });

    // Obtener todas las asignaciones del año actual
    const anioActual = getYear(new Date());
    const asignacionesAnioActual = await this.prismaService.asignacion.findMany({
      where: { anio: anioActual },
    });

    // Crear un mapa de asignaciones del año anterior por algún identificador único
    const asignacionesMap = new Map(asignacionesAnioAnterior.map(asignacion => [`${asignacion.id_unidad}-${asignacion.id_criterio}-${asignacion.id_indicador}`, asignacion]));

    // Actualizar las asignaciones del año actual con los valores de recomendado del año anterior
    for (const asignacionActual of asignacionesAnioActual) {
    const asignacionAnterior = asignacionesMap.get(asignacionActual.anio.toString());
      if (asignacionAnterior) {
        await this.prismaService.asignacion.update({
          where: { 
            id_unidad_id_criterio_id_indicador_anio: {
              id_unidad: asignacionActual.id_unidad,
              id_criterio: asignacionActual.id_criterio,
              id_indicador: asignacionActual.id_indicador,
              anio: asignacionActual.anio
            }
          },
          data: { recomendado: asignacionAnterior.recomendado },
        });
      }
    }
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

    /*
    updateAsignacion(asignacion: Asignacion) {
        return this.prismaService.asignacion.update({
            where: { id_unidad_id_criterio_id_indicador_anio: { id_unidad: asignacion.id_unidad, id_criterio: asignacion.id_criterio, id_indicador: asignacion.id_indicador, anio: asignacion.anio } },
            data: asignacion
        });
    }
    */
 
        updateAsignacion(asignacion: Asignacion) {
        return this.prismaService.asignacion.update({
            where: { id_unidad_id_criterio_id_indicador_anio: { id_unidad: asignacion.id_unidad, id_criterio: asignacion.id_criterio, id_indicador: asignacion.id_indicador, anio: asignacion.anio } },
            data: { recomendado: asignacion.recomendado,
                    doc_respuesta: asignacion.doc_respuesta,
                    fecha_respuesta: new Date(),
                    completado: asignacion.completado
            }
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

    deleteMatrizByAnio(anio: number){
        return this.prismaService.asignacion.deleteMany({
            where: {anio : anio}
        });
    }

    getAsignacion(anio: number, id_unidad: number, id_criterio: number, id_indicador: number) {
        return this.prismaService.asignacion.findUnique({
            where: { id_unidad_id_criterio_id_indicador_anio: { id_unidad, id_criterio, id_indicador, anio } }
        });
    }


}
function getYear(arg0: Date): number {
    return arg0.getFullYear();
}

