import { FunFact } from 'components/fun-fact';
import { Phase } from 'components/phase';
import { usePhases } from 'store';

const App = () => {
  const phases = usePhases();

  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-2xl font-semibold">My startup progress</h1>
      <main className="mt-6 bg-white">
        <FunFact />
        <div className="mt-8">
          {phases.map((phase, index) => (
            <div key={phase.name} className={index !== 0 ? 'mt-8' : 'mt-0'}>
              <Phase phaseName={phase.name} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
