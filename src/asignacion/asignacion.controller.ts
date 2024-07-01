import { Body, Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { AsignacionService } from './asignacion.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('asignacion')
@ApiTags('Asignacion')
export class AsignacionController {
    constructor(private asignacionService: AsignacionService) {}

    
    @Get()
    getAsignaciones() {
        return this.asignacionService.getAsignaciones();
    }

    @Post()
    createAsignacion(@Body() asignacion: any) {
        return this.asignacionService.createAsignacion(asignacion);
    }

    @Put()
    updateAsignacion(@Body() body : {anio: number, id_unidad: number, id_criterio: number, id_indicador: number, asignacion: any} ) {
        return this.asignacionService.updateAsignacion(
            body.anio, 
            body.id_unidad, 
            body.id_criterio, 
            body.id_indicador,
            body.asignacion);
    }

    @Patch('/estado')
    updateEstadoAsignacion(@Body() body : {anio: number, id_unidad: number, id_criterio: number, id_indicador: number, completado: boolean} ) {
        return this.asignacionService.updateEstadoAsignacion(
            body.anio,
            body.id_unidad,
            body.id_criterio,
            body.id_indicador,
            body.completado
        );
    }

    @Patch('/recomendado')
    updateRecomendadoAsignacion(@Body() body : {anio: number, id_unidad: number, id_criterio: number, id_indicador: number, recomendado: boolean} ) {
        return this.asignacionService.updateRecomendadoAsignacion(
            body.anio,
            body.id_unidad,
            body.id_criterio,
            body.id_indicador,
            body.recomendado
        );
    }

    @Patch('/doc-respuesta')
    updateDocRespuestaAsignacion(@Body() body : {anio: number, id_unidad: number, id_criterio: number, id_indicador: number, doc_respuesta: string} ) {
        return this.asignacionService.updateDocRespuestaAsignacion(
            body.anio,
            body.id_unidad,
            body.id_criterio,
            body.id_indicador,
            body.doc_respuesta
        );
    }

    @Delete()
    deleteAsignacion(@Body() body:{anio: number, id_unidad: number, id_criterio: number, id_indicador: number}) {
        return this.asignacionService.deleteAsignacion(
            body.anio,
            body.id_unidad,
            body.id_criterio,
            body.id_indicador
        );
    }


}
