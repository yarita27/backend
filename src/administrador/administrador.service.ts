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

    deleteAdministrador(id: number) {
        console.log(id);
        return this.prisma.administrador.delete({ where: { id: id } });
    }
}




