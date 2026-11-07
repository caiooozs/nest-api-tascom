import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TarefasService } from './tarefas.service';

@Controller('tarefas')
export class TarefasController {
  constructor(private readonly tarefasService: TarefasService) {}

  @Get()
  listar() {
    return this.tarefasService.listar();
  }

  @Get(':id')
  buscar(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.tarefasService.buscar(id);
  }

  @Post()
  criar(@Body() body: { titulo: string }) {
    return this.tarefasService.criar(body.titulo);
  }

  @Patch(':id')
  atualizar(
    @Param('id', ParseIntPipe)
    id: number,
    body: { titulo?: string; feita?: boolean },
  ) {}

  @Delete(':id')
  @HttpCode(204)
  remover(
    @Param(':id', ParseIntPipe)
    id: number,
  ) {
    this.tarefasService.remover(id);
  }
}
