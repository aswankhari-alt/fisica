
import React, { useState, FormEvent } from 'react';
import Modal from './Modal';

interface Phase4BridgeProps {
  onComplete: (success: boolean) => void;
  teamNumber: number;
}

const ASTRONAUT_MASS_KG = 100;
const GRAVITY = 9.8;
const ASTRONAUT_WEIGHT_N = ASTRONAUT_MASS_KG * GRAVITY;
const BRIDGE_LENGTH_M = 10;
const ASTRONAUT_POS_M = 2;

// Calculations
// Sum of torques around A = 0
// FB * 10 - (100 * 9.8) * 2 = 0
// FB = (1960) / 10 = 196 N
const CORRECT_FB = 196;
// Sum of forces = 0
// FA + FB - (100 * 9.8) = 0
// FA = 980 - 196 = 784 N
const CORRECT_FA = 784;

const Phase4Bridge: React.FC<Phase4BridgeProps> = ({ onComplete, teamNumber }) => {
  const [fa, setFa] = useState('');
  const [fb, setFb] = useState('');
  const [showHintModal, setShowHintModal] = useState(false);
  const [isBridgeVibrating, setIsBridgeVibrating] = useState(false);
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const faNum = parseFloat(fa);
    const fbNum = parseFloat(fb);
    const faCorrect = Math.abs(faNum - CORRECT_FA) < 1; // Tolerance for floating point
    const fbCorrect = Math.abs(fbNum - CORRECT_FB) < 1;

    if (faCorrect && fbCorrect) {
      onComplete(true);
    } else {
      setIsBridgeVibrating(true);
      setShowHintModal(true);
      setTimeout(() => setIsBridgeVibrating(false), 1000);
    }
  };

  return (
    <div className="p-6 bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-lg shadow-2xl shadow-cyan-500/10">
      {showHintModal && (
        <Modal title="¡Alerta de Estrés Estructural!" onConfirm={() => setShowHintModal(false)}>
          <p>Los cálculos de reacción son incorrectos y el puente es inestable. Revisa tus cálculos.</p>
          <p className="mt-2 font-bold text-cyan-300">Pista: Para encontrar F<sub>B</sub>, calcula la suma de los torques con respecto al pilar A (Στ<sub>A</sub> = 0).</p>
        </Modal>
      )}

      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-cyan-400 font-orbitron">Fase IV: El Puente Estelar INA-73</h2>
        <p className="text-slate-400">Equipo de Ingeniería N° {teamNumber}</p>
        <p className="text-slate-300 mt-2">Calcula las fuerzas de reacción en los pilares A y B para estabilizar el puente.</p>
      </div>
      
      {/* Bridge Visualization */}
      <div className="my-8 h-48 bg-slate-900/50 p-4 rounded-lg flex flex-col justify-end">
          <div className="relative h-20">
              {/* Bridge Beam */}
              <div className={`h-4 bg-gradient-to-r from-slate-500 to-slate-400 w-full absolute bottom-10 ${isBridgeVibrating ? 'animate-shake' : ''}`}></div>
              {/* Pillars */}
              <div className="absolute w-6 h-12 bg-slate-600 bottom-0 left-0">
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-bold">A</span>
              </div>
              <div className="absolute w-6 h-12 bg-slate-600 bottom-0 right-0">
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-bold">B</span>
              </div>
              {/* Astronaut */}
              <div className="absolute bottom-14" style={{left: `${(ASTRONAUT_POS_M / BRIDGE_LENGTH_M) * 100}%`}}>
                  <div className="w-8 h-12 bg-white rounded-t-full"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                  </div>
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-white whitespace-nowrap">{ASTRONAUT_WEIGHT_N.toFixed(0)} N</span>
              </div>
              <div className="absolute bottom-2 text-xs text-slate-400" style={{left: `${(ASTRONAUT_POS_M / BRIDGE_LENGTH_M) * 100 / 2}%`}}>2m</div>
              <div className="absolute bottom-2 text-xs text-slate-400" style={{left: '50%'}}>10m</div>
          </div>
      </div>
      
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <p className="text-center text-lg text-slate-200 mb-4">Ingresa las fuerzas de reacción (en Newtons):</p>
          <div className="flex justify-around items-center">
              <div className="flex flex-col items-center">
                  <label htmlFor="fa" className="text-xl font-bold text-cyan-300 mb-2">F<sub>A</sub></label>
                  <input id="fa" type="number" step="any" value={fa} onChange={(e) => setFa(e.target.value)} className="bg-slate-700 border border-slate-500 text-white text-center text-lg rounded-md p-2 w-32 focus:ring-2 focus:ring-cyan-500 focus:outline-none" required />
              </div>
              <div className="flex flex-col items-center">
                  <label htmlFor="fb" className="text-xl font-bold text-cyan-300 mb-2">F<sub>B</sub></label>
                  <input id="fb" type="number" step="any" value={fb} onChange={(e) => setFb(e.target.value)} className="bg-slate-700 border border-slate-500 text-white text-center text-lg rounded-md p-2 w-32 focus:ring-2 focus:ring-cyan-500 focus:outline-none" required />
              </div>
          </div>
          <div className="text-center mt-8">
              <button type="submit" className="bg-cyan-500 text-slate-900 font-bold py-3 px-8 rounded-md hover:bg-cyan-400 transition-all duration-300 shadow-lg shadow-cyan-500/20 transform hover:scale-105">Estabilizar Puente</button>
          </div>
      </form>
      <style>{`.animate-shake { animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both; } @keyframes shake { 10%, 90% { transform: translate3d(-1px, 0, 0); } 20%, 80% { transform: translate3d(2px, 0, 0); } 30%, 50%, 70% { transform: translate3d(-4px, 0, 0); } 40%, 60% { transform: translate3d(4px, 0, 0); } }`}</style>
    </div>
  );
};

export default Phase4Bridge;
