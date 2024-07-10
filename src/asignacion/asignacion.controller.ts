import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { Asignacion, AsignacionService } from './asignacion.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('asignacion')
@ApiTags('Asignacion')
export class AsignacionController {
    constructor(private asignacionService: AsignacionService) {}

    
    @Get('all')
    getAsignaciones() {
        return this.asignacionService.getAsignaciones();
    }

    @Get(':anio')
    getAsignacionesByAnio(@Param('anio') anio: string) {
        const anioNumber = parseInt(anio, 10);
        if (isNaN(anioNumber)) {
            throw new BadRequestException('Invalid year parameter');
        }
        return this.asignacionService.getAsignacionesByAnio(anioNumber);
    }

    @Get('/anios/actuales')
    getAniosAsignados() {
        return this.asignacionService.getAniosAsignados();
    }

    @Get('indicadores/:anio')
    getIndicadoresByAnio(@Param('anio') anio: string) {
        const anioNumber = parseInt(anio, 10);
        if (isNaN(anioNumber)) {
            throw new BadRequestException('Invalid year parameter');
        }
        return this.asignacionService.getIndicadoresByAnio(anioNumber);
    }

    @Get('unidades/:anio')
    getUnidadesByAnio(@Param('anio') anio: string) {
        const anioNumber = parseInt(anio, 10);
        if (isNaN(anioNumber)) {
            throw new BadRequestException('Invalid year parameter');
        }
        return this.asignacionService.getUnidadesByAnio(anioNumber);
    }

    @Post()
    createAsignacion(@Body() asignacion: any) {
        return this.asignacionService.createAsignacion(asignacion);
    }

    @Put('matriz')
    guardarMatriz(@Body() asignaciones : Asignacion[]){
        return this.asignacionService.guardarMatriz(asignaciones);
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
