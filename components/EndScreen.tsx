
import React from 'react';

interface EndScreenProps {
  success: boolean;
  onRestart: () => void;
}

const EndScreen: React.FC<EndScreenProps> = ({ success, onRestart }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-8 text-center shadow-2xl shadow-cyan-500/10 animate-fade-in">
      {success ? (
        <>
          <h1 className="text-4xl font-bold text-green-400 mb-4 font-orbitron">¡MISIÓN CUMPLIDA!</h1>
          <p className="text-slate-300 text-lg leading-relaxed mb-8">
            El puente es inquebrantable. Tu dominio de la estática y el torque ha salvado a la colonia. La humanidad te lo agradece, Ingeniero/a.
          </p>
          <img src="https://picsum.photos/seed/success/600/300" alt="Futuristic bridge" className="rounded-lg mx-auto mb-8" />
        </>
      ) : (
        <>
          <h1 className="text-4xl font-bold text-red-500 mb-4 font-orbitron">FALLO CATASTRÓFICO</h1>
          <p className="text-slate-300 text-lg leading-relaxed mb-8">
            El puente ha colapsado bajo la tensión. Los principios de la estática no fueron aplicados correctamente. La colonia está en peligro. Debes reintentar tu diseño.
          </p>
           <img src="https://picsum.photos/seed/failure/600/300" alt="Collapsed structure" className="rounded-lg mx-auto mb-8 filter grayscale" />
        </>
      )}
      <button
        onClick={onRestart}
        className="bg-cyan-500 text-slate-900 font-bold py-3 px-8 rounded-md hover:bg-cyan-400 transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/40 transform hover:scale-105"
      >
        {success ? 'Iniciar Nueva Misión' : 'Reintentar Diseño'}
      </button>
    </div>
  );
};

export default EndScreen;
