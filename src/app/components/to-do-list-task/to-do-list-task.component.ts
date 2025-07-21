import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup } from '@angular/forms';

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
  selector: 'app-to-do-list-task',
  standalone: false,
  templateUrl: './to-do-list-task.component.html',
  styleUrl: './to-do-list-task.component.css'
})
export class ToDoListTaskComponent implements OnInit {

  tarefas: Tarefa[] = [];
  @Input() tarefaId: number = 0

  addSubTarefaForm!: FormGroup;

  constructor(private tarefaService: ItemService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.addSubTarefaForm = new FormGroup({
      id: new FormControl(null),
      titulo: new FormControl(null)
    });    

    this.carregarSubtarefas()

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tarefaId'] && changes['tarefaId'].currentValue !== undefined) {
      this.carregarSubtarefas()
    }
  }

  carregarSubtarefas() {

    if(this.tarefaId === 0) {
       this.tarefas = [
        {
          id: 0,
          titulo: 'Nenhuma tarefa selecionada',
          concluida: false,
          ativa: true,
          subTarefas: [
          ]
        }
      ]     
    } else {
      this.tarefas = this.tarefaService.getTarefaById(this.tarefaId);
    }

  }

  // Método para adicionar nova sub-tarefa utilizando FormControl e o componente item.service.ts
  addSubTarefa(id: number): void {
    if (this.addSubTarefaForm.value.titulo) {
      const newSubTarefa: SubTarefa = {
        id: this.tarefaService.getNumeroSubtarefas(this.addSubTarefaForm.value.id) + 1, // Pega o ultimo ID e soma mais 1
        titulo: this.addSubTarefaForm.value.titulo,
        concluida: false,
        ativa: true
      };
      this.tarefaService.addSubTarefa(id, newSubTarefa);
      this.addSubTarefaForm.get('titulo')?.setValue(null);
      this.carregarSubtarefas()

      this.toastr.info('Sub-Tarefa adicionada com sucesso!', 'Informe', {
        timeOut: 3000, progressBar: true, progressAnimation:"decreasing"
      });

    } else {
      this.toastr.error('Nome da sub-tarefa é requerido!', 'Atenção', {
        timeOut: 3000, progressBar: true, progressAnimation:"decreasing"
      });
    }
  } 

  alterarSituacaoSubTarefa(idTarefa: number, idSubTarefa: number) {
    let situacaoSubTarefa = this.tarefaService.alterarSituacaoSubTarefaService(idTarefa, idSubTarefa)
    this.carregarSubtarefas()

    if (!situacaoSubTarefa) {
      this.toastr.info('Sub-Tarefa reaberta com sucesso!', 'Informe', {
        timeOut: 3000, progressBar: true, progressAnimation:"decreasing"
      });
    } else {
      this.toastr.success('Sub-Tarefa concluida com sucesso!', 'Parabéns', {
        timeOut: 3000, progressBar: true, progressAnimation:"decreasing"
      });
    } 

  }
  
  excluirSubTarefa(idTarefa: number, idSubTarefa: number): void {
    this.tarefaService.excluirSubTarefaService(idTarefa, idSubTarefa)
    this.carregarSubtarefas()

    this.toastr.error('Sub-Tarefa excluida com sucesso!', 'Atenção', {
      timeOut: 3000, progressBar: true, progressAnimation:"decreasing"
    });    
  }   

}
