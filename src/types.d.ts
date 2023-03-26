export type Phase = {
  name: string;
  order: number;
  tasks: Task[];
  completed: boolean;
};

export type TaskStatus = 'new' | 'done';

export type Task = {
  taskId: string;
  name: string;
  status: TaskStatus;
};

export type TaskChangeEvent = {
  taskId: string;
  status: TaskStatus;
};
