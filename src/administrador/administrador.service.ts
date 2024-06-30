import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class AdministradorService {

    constructor(private prisma: PrismaService) {}

    getAdministradores() {
        return this.prisma.administrador.findMany();
    }

    createAdministrador(data: { id: number; nombre: string; correo: string; contrasena: string;}) {
        return this.prisma.administrador.create({
            data
        });
    }
}




