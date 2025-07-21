import { Component, Input, Output } from '@angular/core';
import { ItemService } from '../../services/item.service';

export interface SubTarefa {
  id: number;
  titulo: string;
  concluida: boolean;
  ativa: boolean
}

export interface Tarefa {
  id: number;
  titulo: string;
  concluida: boolean;
  ativa: boolean,
  subTarefas: SubTarefa[];
}

@Component({
  selector: 'app-to-do-list',
  standalone: false,
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.css'
})
export class ToDoListComponent {

  tarefasConcluidas: Tarefa[] = []; // Adicione esta linha
  tarefasPendentes: Tarefa[] = []; // Adicione esta linha
  tarefaIdVisualizar: number = 0; // Adicione esta linha

  constructor(private tarefaService: ItemService) {} // Adicione o construtor se não existir

  atualizarConcluidas(): void {
    this.tarefasConcluidas = this.tarefaService.getTarefasConcluidas().reverse();
  }

  atualizarPendentes(): void {
    this.tarefasPendentes = this.tarefaService.getTarefasPendentes().reverse();
  }

  mostrarSubtarefas(tarefaId: number): void {
    this.tarefaIdVisualizar = tarefaId;
  }

}
