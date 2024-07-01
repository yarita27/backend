import { Body, Controller, Delete, Get, Patch, Post, Put, Req, Res } from '@nestjs/common';
import { AdministradorService } from './administrador.service';
import { request } from 'http';

@Controller('/admin')
export class AdministradorController {


    constructor(private administradorService: AdministradorService) {}



    @Get()
    getAllAdmin() {
        return this.administradorService.getAdministradores();
    }

    @Post()
    createAdmin(@Body() admin: any) {
        return this.administradorService.createAdministrador(admin);
    }

    @Put()
    updateAdmin(@Body() body : {id:number, admin: any} ) {
        return this.administradorService.updateAdministrador(body.id,body.admin);
    }

    @Delete()
    deleteAdmin(@Body() body: { id: number }) {
        return this.administradorService.deleteAdministrador(body.id);
    }

    @Patch()
    updateAdminPass(@Body() body : {id:number, contrasena:string} ) {
        return this.administradorService.updateAdministradorPass(body.id,body.contrasena);
    }
}