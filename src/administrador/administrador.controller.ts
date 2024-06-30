import { Controller, Get } from '@nestjs/common';
import { AdministradorService } from './administrador.service';

@Controller('administrador')
export class AdministradorController {


    constructor(private administradorService: AdministradorService) {}

    @Get('/admin')
    getAdministradores() {
        return this.administradorService.getAdministradores();
    }

}