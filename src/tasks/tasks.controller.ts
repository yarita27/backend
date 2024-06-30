import { Controller, Get } from "@nestjs/common";
import { TasksService } from "./tasks.service";

@Controller()
export class TasksController {

    tasksService: TasksService;
    constructor(tasksService: TasksService) {
        this.tasksService = tasksService;
    }

    @Get('/tasks')
    getAllTasks() {
        return 'Get all tasks';
    }

    @Get('/admins')
    getAdmins() {
        return this.tasksService.getAdmin();
    }

}