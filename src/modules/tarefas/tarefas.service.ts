import { Injectable, NotFoundException } from '@nestjs/common';

export interface Tarefa {
  id: number;
  titulo: string;
  feita: boolean;
}

@Injectable()
export class TarefasService {
  private tarefas: Tarefa[] = [];
  private proximoId = 1;

  listar() {
    return this.tarefas;
  }

  buscar(id: number) {
    const tarefas = this.tarefas.find((t) => t.id === id);
    if (!tarefas) {
      throw new NotFoundException(`Tarefa ${id} não existe`);
    }
    return tarefas;
  }

  criar(titulo: string) {
    const tarefa = { id: this.proximoId++, titulo, feita: false };
    this.tarefas.push(tarefa);
    return tarefa;
  }

  atualizar(id: number, dados: { titulo?: string; feita?: boolean }) {
    return Object.assign(this.buscar(id), dados);
  }

  remover(id: number) {
    this.buscar(id);
    this.tarefas = this.tarefas.filter((t) => t.id !== id);
  }
}
