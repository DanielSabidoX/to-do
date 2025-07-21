import { Injectable } from '@angular/core';
import { Tarefa, SubTarefa, TAREFAS } from './item.mock';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private tarefas: Tarefa[] = TAREFAS;
  private subTarefas: SubTarefa[] = [];

  constructor() { }

  getTitulo(id: number) {
    const tarefa = this.tarefas.find(tarefa => tarefa.id === id)

    if (tarefa) {
      return tarefa.titulo
    }

    return null
  }

  getUltimoId(): number {
    return this.tarefas.length;
  }

  getTarefas(): Tarefa[] {
    return this.tarefas;
  }

  getTarefasPendentes(): Tarefa[] {
    return this.tarefas.filter(tarefa => !tarefa.concluida);
  }

  getTarefasConcluidas(): Tarefa[] {
    return this.tarefas.filter(tarefa => tarefa.concluida);
  }

  // Método para adicionar tarefa
  addTarefa(tarefa: Tarefa): void {
    this.tarefas.push(tarefa);
  }

  // Método para concluir tarefa
  concluirTarefaService(id: number): void {
    const tarefa = this.tarefas.find(tarefa => tarefa.id === id)
    if (tarefa) {
      tarefa.concluida = true
    }
  }

  // Método para concluir tarefa
  excluirTarefaService(id: number): void {
    const tarefa = this.tarefas.find(tarefa => tarefa.id === id)
    if (tarefa) {
      tarefa.ativa = false
    }
  }  

  // Método para concluir tarefa
  reabrirTarefaService(id: number): void {
    const tarefa = this.tarefas.find(tarefa => tarefa.id === id)
    if (tarefa) {
      tarefa.concluida = false
    }
  }

  getTarefaById(id: number): Tarefa[] {
    const tarefa = this.tarefas.find(tarefa => tarefa.id === id);
    return tarefa ? [tarefa] : [];
  }

  getNumeroSubtarefas(id: number): number {
    const tarefa = this.tarefas.find(tarefa => tarefa.id === id)
    return tarefa ? tarefa.subTarefas.length : 0;
  }

  addSubTarefa(id: number, subTarefas: SubTarefa) {
    const tarefa = this.tarefas.find(tarefa => tarefa.id === id)
    tarefa?.subTarefas.push(subTarefas)
  }

  // Método para concluir tarefa
  alterarSituacaoSubTarefaService(idTarefa: number, idSubTarefa: number): boolean {
    const tarefa = this.tarefas.find(tarefa => tarefa.id === idTarefa)
    if (tarefa) {
      const subTarefa = tarefa.subTarefas.find(sub => sub.id === idSubTarefa)
      if (subTarefa) {
        if(!subTarefa.concluida) {
          subTarefa.concluida = true;
        } else {
          subTarefa.concluida = false;
        }
      }
      return subTarefa ? subTarefa.concluida : false;
    }
    return false
  }  

  // Método para concluir tarefa
  excluirSubTarefaService(idTarefa: number, idSubTarefa: number): void {
    const tarefa = this.tarefas.find(tarefa => tarefa.id === idTarefa)
    if (tarefa) {
      const subTarefa = tarefa.subTarefas.find(sub => sub.id === idSubTarefa)
      if (subTarefa) {
        if(!subTarefa.ativa) {
          subTarefa.ativa = true;
        } else {
          subTarefa.ativa = false;
        }
      }
    }
  }  

}
