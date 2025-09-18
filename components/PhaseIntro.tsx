
import React from 'react';

interface PhaseIntroProps {
  title: string;
  narrative: string;
  buttonText: string;
  onNext: () => void;
}

const PhaseIntro: React.FC<PhaseIntroProps> = ({ title, narrative, buttonText, onNext }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-8 text-center shadow-2xl shadow-cyan-500/10 animate-fade-in">
      <h1 className="text-3xl font-bold text-cyan-400 mb-4 font-orbitron">{title}</h1>
      <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-3xl mx-auto">{narrative}</p>
      <button
        onClick={onNext}
        className="bg-cyan-500 text-slate-900 font-bold py-3 px-8 rounded-md hover:bg-cyan-400 transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/40 transform hover:scale-105"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default PhaseIntro;
