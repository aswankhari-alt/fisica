
import React, { useState, useMemo } from 'react';
import { Coin } from '../types';
import Modal from './Modal';

interface Phase1SeesawProps {
  onComplete: () => void;
  teamNumber: number;
}

const RULER_LENGTH_CM = 30;
const FULCRUM_POSITION_CM = 15;

const Phase1Seesaw: React.FC<Phase1SeesawProps> = ({ onComplete, teamNumber }) => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [nextCoinId, setNextCoinId] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showHintModal, setShowHintModal] = useState(false);

  const addCoin = (rulerPositionCm: number) => {
    // position from -15 to 15 relative to fulcrum
    const position = rulerPositionCm - FULCRUM_POSITION_CM;
    const newCoin: Coin = { id: nextCoinId, position };
    setCoins([...coins, newCoin]);
    setNextCoinId(nextCoinId + 1);
  };
  
  const removeCoin = (id: number) => {
      setCoins(coins.filter(c => c.id !== id));
  }

  const netTorque = useMemo(() => {
    return coins.reduce((total, coin) => total + coin.position, 0);
  }, [coins]);
  
  const rotation = useMemo(() => {
    return Math.max(-20, Math.min(20, netTorque * 2));
  }, [netTorque]);

  const checkBalance = () => {
    if (netTorque === 0 && coins.length > 1) {
      setShowSuccessModal(true);
    } else {
      setShowHintModal(true);
    }
  };

  const RulerMarkings = () => {
    const marks = [];
    for (let i = 0; i <= RULER_LENGTH_CM; i++) {
      const isMajor = i % 5 === 0;
      marks.push(
        <div key={i} className="absolute h-full" style={{ left: `${(i / RULER_LENGTH_CM) * 100}%` }}>
          <div className={`w-px ${isMajor ? 'h-4 bg-slate-300' : 'h-2 bg-slate-500'}`} />
          {isMajor && <span className="absolute -bottom-5 -translate-x-1/2 text-xs text-slate-400">{i}</span>}
        </div>
      );
    }
    return <>{marks}</>;
  };
  
  const CoinSlots = () => {
    return (
      <div className="absolute top-0 left-0 w-full h-full flex">
        {[...Array(RULER_LENGTH_CM + 1)].map((_, i) => (
          <div key={i} className="flex-1 h-full cursor-pointer" onClick={() => addCoin(i)} />
        ))}
      </div>
    );
  }

  return (
    <div className="p-6 bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-lg shadow-2xl shadow-cyan-500/10">
      {showSuccessModal && (
        <Modal title="¡Equilibrio Logrado!" onConfirm={onComplete}>
          <p>Has aplicado exitosamente el principio del torque. La suma de los torques en ambos lados es cero, creando un sistema estable.</p>
        </Modal>
      )}
      {showHintModal && (
        <Modal title="Desequilibrio Detectado" onConfirm={() => setShowHintModal(false)}>
          <p>El balancín no está equilibrado. Recuerda: τ = Fuerza × distancia. Para equilibrar, los torques horarios deben igualar a los torques antihorarios. Intenta colocar monedas en el lado opuesto para contrarrestar el giro. ¡Necesitas al menos dos monedas!</p>
        </Modal>
      )}

      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-cyan-400 font-orbitron">Fase I: El Balancín Espacial</h2>
        <p className="text-slate-400">Equipo de Ingeniería N° {teamNumber}</p>
        <p className="text-slate-300 mt-2">Coloca las monedas (discos) en la regla para lograr el equilibrio. El fulcro está en la marca de 15 cm.</p>
      </div>
      
      <div className="h-64 flex items-center justify-center">
         <div className="relative" style={{width: '600px'}}>
             <div 
                className="h-2 bg-gradient-to-r from-sky-400 to-cyan-400 rounded-full relative transition-transform duration-500 ease-out"
                style={{ transform: `rotate(${rotation}deg)` }}
             >
                <RulerMarkings />
                <CoinSlots />
                {coins.map(coin => (
                    <div 
                      key={coin.id} 
                      className="absolute -top-8 w-6 h-6 bg-yellow-400 rounded-full border-2 border-yellow-600 shadow-md flex items-center justify-center cursor-pointer"
                      style={{ left: `calc(${(coin.position + FULCRUM_POSITION_CM) / RULER_LENGTH_CM * 100}% - 12px)` }}
                      onClick={() => removeCoin(coin.id)}
                      title="Haz clic para quitar"
                    >
                    </div>
                ))}
             </div>
             {/* Fulcrum */}
             <div className="absolute top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[30px] border-b-slate-600"></div>
         </div>
      </div>

      <div className="mt-16 text-center flex justify-center items-center space-x-4">
        <button onClick={() => setCoins([])} className="bg-slate-600 text-white font-bold py-2 px-6 rounded-md hover:bg-slate-500 transition-colors">Reiniciar</button>
        <button onClick={checkBalance} className="bg-cyan-500 text-slate-900 font-bold py-3 px-8 rounded-md hover:bg-cyan-400 transition-all duration-300 shadow-lg shadow-cyan-500/20 transform hover:scale-105">Verificar Equilibrio</button>
      </div>
    </div>
  );
};

export default Phase1Seesaw;
