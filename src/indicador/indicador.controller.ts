import { Body, Controller, Delete, Get, Post, Put ,Patch} from '@nestjs/common';
import { IndicadorService } from './indicador.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('indicador')
@ApiTags('Indicador')
export class IndicadorController {
    constructor(private indicadorService: IndicadorService) {}

    
    @Get()
    getIndicadores() {
        return this.indicadorService.getIndicadores();
    }

    @Get('activos')
    indicadoresActivos(){
        return this.indicadorService.indicadoresActivos();
    }

    @Post()
    createIndicador(@Body() indicador: any){
        return this.indicadorService.createIndicador(indicador);
    }

    @Put()
    updateIndicador(@Body() body : {id_criterio:number, id:number, indicador: any} ) {
        return this.indicadorService.updateIndicador(body.id_criterio,body.id,body.indicador);
    }

    @Patch()
    updateEstadoIndicador(@Body() body : {id_criterio:number, id:number, estado: boolean} ) {
        return this.indicadorService.updateEstadoIndicador(body.id_criterio,body.id,body.estado);
    }

    @Delete()
    deleteIndicador(@Body() body : {id_criterio:number, id: number} ) {
        return this.indicadorService.deleteIndicador(body.id_criterio,body.id);
    }
}
