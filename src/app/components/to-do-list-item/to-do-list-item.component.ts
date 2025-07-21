import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { FormControl, FormGroup } from '@angular/forms';
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
  selector: 'app-to-do-list-item',
  standalone: false,
  templateUrl: './to-do-list-item.component.html',
  styleUrl: './to-do-list-item.component.css'
})
export class ToDoListItemComponent implements OnInit {
  // Informar ao componente PAI sobre a notificação
  @Output() tarefaConcluida = new EventEmitter<void>();
  @Output() tarefaId = new EventEmitter<number>();

  selectedTarefaId: number | null = null;

  addTarefaForm!: FormGroup;

  @Input() tarefas: Tarefa[] = [];

  constructor(private tarefaService: ItemService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.tarefas = this.tarefaService.getTarefasPendentes().reverse();
    this.addTarefaForm = new FormGroup({
      titulo: new FormControl(null)
    });

  }

  // Método para adicionar nova tarefa utilizando FormControl e o componente item.service.ts
  addTarefa(): void {
    if (this.addTarefaForm.value.titulo) {
      const newTarefa: Tarefa = {
        id: this.tarefaService.getUltimoId() + 1, // Pega o ultimo ID e soma mais 1
        titulo: this.addTarefaForm.value.titulo,
        concluida: false,
        ativa: true,
        subTarefas: []
      };
      this.tarefaService.addTarefa(newTarefa);
      this.addTarefaForm.reset();
      this.tarefas = this.tarefaService.getTarefasPendentes().reverse() // Atualiza a lista de tarefas pendentes

      this.toastr.info('Tarefa adicionada com sucesso!', 'Informe', {
        timeOut: 3000, progressBar: true, progressAnimation:"decreasing"
      });

    } else {
      this.toastr.error('Nome da tarefa é requerido!', 'Atenção', {
        timeOut: 3000, progressBar: true, progressAnimation:"decreasing"
      });
    }
  }

  concluirTarefa(id: number): void {
    this.tarefaService.concluirTarefaService(id)
    this.tarefas = this.tarefaService.getTarefasPendentes().reverse() // Atualiza a lista de tarefas pendentes
    this.tarefaConcluida.emit() // Notifica o componente pai

    this.toastr.success('Tarefa concluida com sucesso!', 'Parabéns', {
      timeOut: 3000, progressBar: true, progressAnimation:"decreasing"
    });
  }

  carregarSubtarefas(id: number): void {
    this.selectedTarefaId = id;
    this.tarefaId.emit(id)
  }

  excluirTarefa(id: number): void {
    this.tarefaService.excluirTarefaService(id)
    this.tarefas = this.tarefaService.getTarefasPendentes().reverse() // Atualiza a lista de tarefas pendentes

    this.toastr.error('Tarefa excluida com sucesso!', 'Atenção', {
      timeOut: 3000, progressBar: true, progressAnimation:"decreasing"
    });    
  }  
  
  getSubTarefasAtivasCount(tarefa: Tarefa): number {
    return tarefa.subTarefas.filter(sub => sub.ativa).length;
  }

  getTarefasPendentesCount(): number {
    const tarefas = this.tarefaService.getTarefas()
    return tarefas.filter(tarefa => tarefa.concluida === false).length;
  }

}
