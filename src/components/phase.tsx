import { memo, useCallback, useState } from 'react';
import { useActions, usePhase } from 'store';
import { TaskChangeEvent } from 'types';

import { AddTaskForm } from './add-task-form';
import { TaskList } from './task-list';

type PhaseProps = {
  phaseName: string;
};

const PhaseComponent = ({ phaseName }: PhaseProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const phase = usePhase(phaseName);
  const { addTask, completeTask, undoTask } = useActions();

  const handleTaskChange = useCallback(
    ({ taskId, status }: TaskChangeEvent) => {
      try {
        if (status === 'done') completeTask(phaseName, taskId);
        else if (status === 'new') undoTask(phaseName, taskId);
        else throw new Error(`Invalid task status '${status}'.`);
      } catch (err) {
        const error = err as Error;
        alert(error.message);
      }
    },
    [completeTask, phaseName, undoTask]
  );

  const handleAddTask = ({ taskName }: { taskName: string }) => {
    try {
      addTask(phaseName, taskName);
    } catch (err) {
      const error = err as Error;
      alert(error.message);
    }
  };

  return (
    <>
      <div className="mb-4 flex items-center gap-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
          {phase?.order}
        </span>
        {phase?.completed ? (
          <span title={`Phase ${phase?.name} has been completed.`}>✅</span>
        ) : (
          <button
            className="rounded-xl bg-black p-2 text-white"
            onClick={() => setIsOpen(true)}
          >
            New task
          </button>
        )}
        <h3 className="text-2xl font-semibold">{phase?.name}</h3>
      </div>
      <div className="ml-2">
        <div className="mb-2">
          <TaskList
            tasks={phase?.tasks ?? []}
            onTaskChange={handleTaskChange}
          />
        </div>
        {isOpen && (
          <AddTaskForm
            onSubmit={handleAddTask}
            onClose={() => setIsOpen(false)}
          />
        )}
      </div>
    </>
  );
};

export const Phase = memo(PhaseComponent);
