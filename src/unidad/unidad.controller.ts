import { Body, Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { UnidadService } from './unidad.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('/unidad')
@ApiTags('Unidad')
export class UnidadController {

    constructor(private unidadService: UnidadService) {}

    @Get()
    getUnidades() {
        return this.unidadService.getUnidades();
    }

    @Post()
    createUnidad(@Body() unidad: any){
        return this.unidadService.createUnidad(unidad);
    }

    @Put()
    updateUnidad(@Body() body : {id:number, unidad: any} ) {
        return this.unidadService.updateUnidad(body.id,body.unidad);
    }

    @Patch()
    updateEstadoUnidad(@Body() body : {id:number, estado: boolean} ) {
        return this.unidadService.updateEstadoUnidad(body.id,body.estado);
    }

    @Delete()
    deleteUnidad(@Body() body : {id: number}) {
        return this.unidadService.deleteUnidad(body.id);
    }
}
