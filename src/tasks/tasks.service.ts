import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TasksService {

    constructor(private prisma: PrismaService) {}

    getAdmin() {
        //return ["admin 1", "admin 2", "admin 3"];
        return this.prisma.administrador.findMany();
    }
}
