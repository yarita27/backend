import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { AsignacionService } from './asignacion.service';

@Controller('asignacion')
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
