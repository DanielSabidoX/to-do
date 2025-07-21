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

export const TAREFAS: Tarefa[] = [
  {
    id: 1,
    titulo: 'Tarefa 1',
    concluida: false,
    ativa: true,
    subTarefas: [
      { id: 1, titulo: 'Sub-Tarefa 1', concluida: false, ativa: true },
      { id: 2, titulo: 'Sub-Tarefa 2', concluida: false, ativa: false },
      { id: 3, titulo: 'Sub-Tarefa 3', concluida: true, ativa: true }
    ]
  },
  {
    id: 2,
    titulo: 'Tarefa 2',
    concluida: true,
    ativa: true,
    subTarefas: [
      { id: 4, titulo: 'Sub-Tarefa 4', concluida: true, ativa: true },
      { id: 5, titulo: 'Sub-Tarefa 5', concluida: false, ativa: true }
    ]
  }
];