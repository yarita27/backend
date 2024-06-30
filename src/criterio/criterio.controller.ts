import { Controller,Body, Get, Post, Delete } from '@nestjs/common';
import { CriterioService } from './criterio.service';

@Controller('criterio')
export class CriterioController {

    constructor(private criterioService: CriterioService) {}

    @Get()
    getCriterios() {
        return this.criterioService.getCriterios();
    }

    @Post()
    createCriterio(@Body() criterio: any){
        return this.criterioService.createCriterio(criterio);
    }

    @Delete()
    deleteCriterio(@Body() body : {id: number}) {
        return this.criterioService.deleteCriterio(body.id);
    }
}
