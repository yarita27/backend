import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { IndicadorService } from './indicador.service';

@Controller('indicador')
export class IndicadorController {
    constructor(private indicadorService: IndicadorService) {}

    @Get()
    getIndicadores() {
        return this.indicadorService.getIndicadores();
    }

    @Post()
    createIndicador(@Body() indicador: any){
        return this.indicadorService.createIndicador(indicador);
    }

    @Delete()
    deleteIndicador(@Body('id') body : {id_criterio:number, id: number} ) {
        return this.indicadorService.deleteIndicador(body.id_criterio,body.id);
    }
}
