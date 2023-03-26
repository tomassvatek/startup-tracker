import { memo } from 'react';
import { Task, TaskChangeEvent } from 'types';

type TaskListProps = {
  tasks: Task[];
  onTaskChange?: ({ taskId, status }: TaskChangeEvent) => void;
};

export const TaskList = ({ tasks, onTaskChange }: TaskListProps) => {
  return (
    <ul>
      {tasks.map((task, index) => (
        <div key={task.taskId} className={index !== 0 ? 'mt-2' : 'mt-0'}>
          <MemoizedTaskItem task={task} onTaskChange={onTaskChange} />
        </div>
      ))}
    </ul>
  );
};

const TaskItem = ({
  task,
  onTaskChange = () => false,
}: {
  task: Task;
  onTaskChange?: ({ taskId, status }: TaskChangeEvent) => void;
}) => {
  return (
    <li className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={task.status === 'done'}
        onChange={(e) =>
          onTaskChange({
            taskId: task.taskId,
            status: e.currentTarget.checked ? 'done' : 'new',
          })
        }
      />
      {task.name}
    </li>
  );
};

const MemoizedTaskItem = memo(TaskItem);
