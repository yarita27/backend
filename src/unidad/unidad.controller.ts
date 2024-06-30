import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { UnidadService } from './unidad.service';

@Controller('/unidad')
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


    @Delete()
    deleteUnidad(@Body() body : {id: number}) {
        return this.unidadService.deleteUnidad(body.id);
    }
}
