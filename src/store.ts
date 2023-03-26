import produce from 'immer';
import { Phase } from 'types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Store = {
  phases: Phase[];
  actions: {
    addTask: (phaseName: string, taskName: string) => void;
    completeTask: (phaseName: string, taskId: string) => void;
    undoTask: (phaseName: string, taskId: string) => void;
    clearAllTasks: () => void;
  };
};

function generateId() {
  return Math.random().toString(36).slice(2, 11);
}

function findPhase(phases: Phase[], phaseId: string) {
  const phase = phases.find((phase) => phase.name === phaseId);
  if (!phase) throw new Error(`Phase '${phaseId}' not found.`);
  return phase;
}

function completeTask(phases: Phase[], phaseId: string, taskId: string) {
  return produce(phases, (draft) => {
    const phase = findPhase(draft, phaseId);

    const taskToComplete = phase.tasks.find((task) => task.taskId === taskId);
    if (!taskToComplete) throw new Error(`Task '${taskId}' not found.`);

    const previousPhase = draft.find((i) => i.order === phase.order - 1);
    if (!isPhaseCompleted(previousPhase)) {
      throw new Error(
        `You have to complete all tasks in '${previousPhase?.name}' phase first.`
      );
    }

    phase.tasks = phase.tasks.map((task) => {
      if (task.taskId === taskToComplete.taskId)
        return { ...task, status: 'done' };
      return task;
    });

    // Check if all tasks are completed, if so, mark the phase as completed
    if (phase.tasks.every((task) => task.status === 'done')) {
      phase.completed = true;
    }
  });
}

function undoTask(phases: Phase[], phaseId: string, taskId: string) {
  return produce(phases, (draft) => {
    const phase = findPhase(draft, phaseId);

    const taskToUndo = phase.tasks.find((task) => task.taskId === taskId);
    if (!taskToUndo) throw new Error(`Task '${taskId}' not found.`);
    if (isPhaseCompleted(phase))
      throw new Error(
        `You can't undo the task '${taskToUndo.name}' because '${phaseId}' phase has been completed.`
      );

    phase.tasks = phase.tasks.map((task) => {
      if (task.taskId === taskToUndo.taskId) return { ...task, status: 'new' };
      return task;
    });
  });
}

function addTask(phases: Phase[], phaseId: string, taskName: string) {
  return produce(phases, (draft) => {
    const phase = findPhase(draft, phaseId);
    phase.tasks.push({ taskId: generateId(), name: taskName, status: 'new' });
  });
}

function isPhaseCompleted(phase: Phase | undefined) {
  // Undefined phase is considered as completed
  if (!phase) return true;

  return phase.tasks.every((task) => task.status === 'done') && phase.completed;
}

const initialPhases: Phase[] = [
  { name: 'Foundation', completed: false, order: 1, tasks: [] },
  { name: 'Discovery', completed: false, order: 2, tasks: [] },
  { name: 'Delivery', completed: false, order: 3, tasks: [] },
];

const useStore = create<Store>()(
  persist(
    (set) => ({
      phases: initialPhases,
      actions: {
        addTask: (phaseId, taskName) =>
          set((state) => ({
            phases: addTask(state.phases, phaseId, taskName),
          })),
        completeTask: (phaseId, taskId) =>
          set((state) => ({
            phases: completeTask(state.phases, phaseId, taskId),
          })),
        undoTask: (phaseId, taskId) =>
          set((state) => ({
            phases: undoTask(state.phases, phaseId, taskId),
          })),
        clearAllTasks: () => set({ phases: initialPhases }),
      },
    }),
    {
      name: 'phases-store',
      partialize: ({ phases }) => ({
        phases,
      }),
    }
  )
);

export const usePhases = () => useStore((state) => state.phases);
export const usePhase = (phaseId: string) =>
  useStore((state) => state.phases.find((phase) => phase.name === phaseId));
export const useActions = () => useStore((state) => state.actions);
