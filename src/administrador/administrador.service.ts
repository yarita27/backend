import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

export interface Administrador {
    id: number;
    nombre: string;
    correo: string;
    contrasena: string;
}

@Injectable()
export class AdministradorService {

    constructor(private prisma: PrismaService) {}

    getAdministradores() {
        return this.prisma.administrador.findMany();
    }

    createAdministrador(admin: Administrador) {
        return this.prisma.administrador.create({ data: admin });
    }

    updateAdministrador(id: number , admin: Administrador) {
        return this.prisma.administrador.update({ 
            where: { id: id }, 
            data: admin
        });
    }

    deleteAdministrador(id: number) {
        return this.prisma.administrador.delete({ where: { id: id } });
    }

    updateAdministradorPass(id: number, pass : string) {
        return this.prisma.administrador.update({
            where: { id: id },
            data: { contrasena: pass }
        });
    }
}




