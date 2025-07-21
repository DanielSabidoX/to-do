import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { ToastrService } from 'ngx-toastr';

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
  selector: 'app-to-do-list-item-done',
  standalone: false,
  templateUrl: './to-do-list-item-done.component.html',
  styleUrl: './to-do-list-item-done.component.css'
})
export class ToDoListItemDoneComponent implements OnInit {

  // Informar ao componente PAI 
  @Output() tarefa = new EventEmitter<void>();

  @Input() tarefasConcluidas: Tarefa[] = [];

  constructor(private tarefaService: ItemService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.tarefasConcluidas = this.tarefaService.getTarefasConcluidas();
  }

  reabrirTarefa(id: number): void {
    this.tarefaService.reabrirTarefaService(id)
    this.tarefasConcluidas = this.tarefaService.getTarefasConcluidas().reverse(); // Atualiza a lista de tarefas concluidas
    this.tarefa.emit(); // Notifica o componente pai

    this.toastr.info('Tarefa reaberta com sucesso!', 'Informe', {
      timeOut: 3000, progressBar: true, progressAnimation:"decreasing"
    });
  }

  getSubTarefasAtivasCount(tarefa: Tarefa): number {
    return tarefa.subTarefas.filter(sub => sub.ativa).length;
  }  

}
