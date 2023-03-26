# Startup Progress Tracker

The Startup Progress Tracker is a web application that allows you to track the progress of your startup. It is a simple application that allows you to create phases and tasks for each phase. You can mark a task as completed and the application will automatically mark the phase as completed if all tasks in the phase are completed. You can also reopen a task if you need to.

## How to run the project

1. `yarn install`
2. `yarn dev`
3. The app will be available at [http://localhost:5177](http://localhost:5177)

## Technologies & Libraries

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Immer](https://immerjs.github.io/immer/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Yarn](https://yarnpkg.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Babel](https://babeljs.io/)

## Requirements

- Every phase can have an unlimited amount of tasks
- If the startup accomplishes all tasks in the phase, it’s marked as
  done and unlocks the next phase.
- Tasks cannot be marked as completed unless all tasks in the
  previous phase were completed.
- Propose and implement a solution how to reopen (undo) a task.

## Propose a solution how to reopen (undo) a task

### What is the problem?

The user can't reopen a task after it is marked as completed. It would be useful if the user can reopen a task if he/she needs to. For example, if the user marks a task as completed by mistake or find out that the task is not completed yet.

### How do you propose to solve the problem?

The user only can reopen a task if the phase is not completed. If the phase is completed, the user can't reopen the task. I deciced to implement this approach because it is simple and it doesn't change the default application logic too much.

### What other approaches did you consider?

1. The user can reopen any task, even if the phase is completed. If the user wants to reopen a task, the application will automatically mark the phase and the following phases as not completed including tasks.
2. The user can reopen any task, even if the phase is completed. If the user wants to reopen a task, the application will automatically move the task to the closest not completed phase. If there is no completed phase, the application creates a new phase called "Final Round" and moves the task there.

These approaches are not implemented because it would change the default application logic too much and it would be more complicated to implement. We could implement any of these approaches in the future if we need it.

## Future improvements

- Add a feature to add a new phase
- Responsive design
- Styling improvements (e.g. hover effects, animations, etc.)
- Use modal instead of alert when the user tries to reopen a task
- Write test especially for the `store.ts` where the core logic is implemented
