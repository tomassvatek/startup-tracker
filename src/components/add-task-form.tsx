type AddTaskFormProps = {
  onClose: () => void;
  onSubmit: ({ taskName }: { taskName: string }) => void;
};

export const AddTaskForm = ({ onClose, onSubmit }: AddTaskFormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit({ taskName: e.currentTarget.taskName.value });
    onClose();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex items-center gap-4">
        <input
          className="rounded border border-black py-1 px-3 placeholder-slate-500"
          type="text"
          name="taskName"
          placeholder="e.g. 'Buy a domain'"
          required
          autoFocus
        ></input>
        <div className="flex items-center gap-2">
          <input
            className="cursor-pointer rounded bg-black py-1 px-3 text-white"
            type="submit"
            value="Add"
          ></input>
          <button
            className="rounded border border-black bg-transparent py-1 px-3 text-black"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
