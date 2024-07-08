import { Controller,Body, Get, Post, Delete, Put, Patch } from '@nestjs/common';
import { CriterioService } from './criterio.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('criterio')
@ApiTags('Criterio')
export class CriterioController {

    constructor(private criterioService: CriterioService) {}

    
    @Get()
    getCriterios() {
        return this.criterioService.getCriterios();
    }

    @Get('activos')
    criteriosActivos() {
        return this.criterioService.criteriosActivos();
    }

    @Post()
    createCriterio(@Body() criterio: any){
        return this.criterioService.createCriterio(criterio);
    }

    @Put()
    updateCriterio(@Body() body : {id:number, criterio: any} ) {
        return this.criterioService.updateCriterio(body.id,body.criterio);
    }

    @Patch()
    updateEstadoCriterio(@Body() body : {id:number, estado: boolean} ) {
        return this.criterioService.updateEstadoCriterio(body.id,body.estado);
    }

    @Delete()
    deleteCriterio(@Body() body : {id: number}) {
        return this.criterioService.deleteCriterio(body.id);
    }
}
