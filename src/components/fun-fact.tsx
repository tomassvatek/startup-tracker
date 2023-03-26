import { useCallback, useEffect, useState } from 'react';
import { useActions, usePhases } from 'store';

const fetchFunFact = async () => {
  // TODO: Find a better place where to store this URL
  const response = await fetch('https://uselessfacts.jsph.pl/random.json');
  if (!response.ok) throw new Error(response.statusText);

  const json = await response.json();
  if (!json.text) throw new Error("Propery 'text' not found in the response.");
  return json.text as string;
};

const useFunFact = () => {
  const phases = usePhases();

  const [funFact, setFunFact] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    (async function () {
      if (phases.every((phase) => phase.completed)) {
        try {
          const funcFact = await fetchFunFact();
          setFunFact(funcFact);
          setError(null);
        } catch (error) {
          setError(error as Error);
        }
      }
    })();
  }, [phases]);

  const resetFact = useCallback(() => {
    setFunFact(null);
    setError(null);
  }, [setFunFact, setError]);

  return { funFact, error, resetFact };
};

export const FunFact = () => {
  const { funFact, error, resetFact } = useFunFact();
  const { clearAllTasks } = useActions();

  if (!funFact) return null;

  const handleStartNewStartup = () => {
    if (
      confirm(
        'Are you sure you want to start a new startup? This action will delete all tasks.'
      )
    ) {
      clearAllTasks();
      resetFact();
    }
  };

  return (
    <div className="rounded border-b border-gray-200 bg-gray-100 p-4">
      {error ? (
        <p className="mb-2 text-red-600">
          There was an error fetching the fun fact. Sorry about that.
        </p>
      ) : (
        <>
          <p className="mb-2">
            Congratulation you have finished the last phase of your startup! 🎉
            Lets take a break and enjoy this fun fact:
          </p>
          <p className="text-gray-600">{funFact}</p>
          <button
            className="mt-2 border-2 border-black bg-transparent px-2 py-3 font-semibold text-black"
            onClick={handleStartNewStartup}
          >
            Start a new Startup
          </button>
        </>
      )}
    </div>
  );
};
