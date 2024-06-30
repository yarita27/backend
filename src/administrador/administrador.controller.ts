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
    updateAdmin() {
        return 'actualizando admin';
    }

    @Delete()
    deleteAdmin(@Body() body: { id: number }) {
        return this.administradorService.deleteAdministrador(body.id);
    }

    @Patch()
    updateAdminStatus() {
        return 'actualizando estado de admin';
    }
}