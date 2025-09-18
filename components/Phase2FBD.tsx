
import React, { useState, DragEvent } from 'react';
import Modal from './Modal';
import { ArrowDownIcon, ArrowUpIcon } from './icons';

interface Phase2FBDProps {
  onComplete: () => void;
  teamNumber: number;
}

type ForceType = 'weight1' | 'weight2' | 'reaction';
type TargetId = 'pos1' | 'pos2' | 'fulcrum';

interface Force {
  id: ForceType;
  label: string;
  placedAt: TargetId | null;
}

const initialForces: Force[] = [
  { id: 'weight1', label: 'Peso 1', placedAt: null },
  { id: 'reaction', label: 'Reacción Fulcro', placedAt: null },
  { id: 'weight2', label: 'Peso 2', placedAt: null },
];

const Phase2FBD: React.FC<Phase2FBDProps> = ({ onComplete, teamNumber }) => {
  const [forces, setForces] = useState<Force[]>(initialForces);
  const [draggedForceId, setDraggedForceId] = useState<ForceType | null>(null);
  const [feedback, setFeedback] = useState<{ target: TargetId; correct: boolean } | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleDragStart = (e: DragEvent<HTMLDivElement>, id: ForceType) => {
    setDraggedForceId(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, targetId: TargetId) => {
    e.preventDefault();
    if (!draggedForceId) return;

    const isCorrect = 
      (draggedForceId === 'weight1' && targetId === 'pos1') ||
      (draggedForceId === 'weight2' && targetId === 'pos2') ||
      (draggedForceId === 'reaction' && targetId === 'fulcrum');

    setFeedback({ target: targetId, correct: isCorrect });
    setTimeout(() => setFeedback(null), 1500);

    if (isCorrect) {
      setForces(prevForces => 
        prevForces.map(f => f.id === draggedForceId ? { ...f, placedAt: targetId } : f)
      );
    }
    
    setDraggedForceId(null);
  };
  
  const checkCompletion = () => {
      const allPlacedCorrectly = forces.every(f => 
        (f.id === 'weight1' && f.placedAt === 'pos1') ||
        (f.id === 'weight2' && f.placedAt === 'pos2') ||
        (f.id === 'reaction' && f.placedAt === 'fulcrum')
      );
      if(allPlacedCorrectly) {
          setShowSuccessModal(true);
      }
  };

  React.useEffect(() => {
    if (forces.every(f => f.placedAt !== null)) {
      checkCompletion();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forces]);

  const unplacedForces = forces.filter(f => f.placedAt === null);

  const getForceIcon = (id: ForceType) => id === 'reaction' ? <ArrowUpIcon /> : <ArrowDownIcon />;

  return (
    <div className="p-6 bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-lg shadow-2xl shadow-cyan-500/10">
       {showSuccessModal && (
        <Modal title="¡Diagrama Correcto!" onConfirm={onComplete}>
          <p>Has construido un Diagrama de Cuerpo Libre (DCL) perfecto. Esto es fundamental para analizar las fuerzas en cualquier sistema de ingeniería.</p>
        </Modal>
      )}

      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-cyan-400 font-orbitron">Fase II: Lenguaje de Ingenieros</h2>
        <p className="text-slate-400">Equipo de Ingeniería N° {teamNumber}</p>
        <p className="text-slate-300 mt-2">Arrastra y suelta las flechas de fuerza para construir el Diagrama de Cuerpo Libre (DCL) del balancín.</p>
      </div>

      <div className="grid grid-cols-3 gap-4 h-64 items-end relative bg-slate-900/50 p-4 rounded-lg">
        {/* Drop Targets */}
        <div id="pos1" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'pos1')} className="h-full border-2 border-dashed border-slate-600 rounded-lg flex flex-col justify-end items-center p-2 relative">
            <div className="w-10 h-10 bg-yellow-500 rounded-md"></div>
            <span className="text-sm mt-2">Moneda 1</span>
             {feedback?.target === 'pos1' && <span className={`absolute top-2 text-sm ${feedback.correct ? 'text-green-400' : 'text-red-400'}`}>{feedback.correct ? "Correcto" : "Incorrecto"}</span>}
        </div>
        <div id="fulcrum" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'fulcrum')} className="h-full border-2 border-dashed border-slate-600 rounded-lg flex flex-col justify-end items-center p-2 relative">
             <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[30px] border-b-slate-500"></div>
             <span className="text-sm mt-2">Fulcro</span>
             {feedback?.target === 'fulcrum' && <span className={`absolute top-2 text-sm ${feedback.correct ? 'text-green-400' : 'text-red-400'}`}>{feedback.correct ? "Correcto" : "Incorrecto"}</span>}
        </div>
        <div id="pos2" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'pos2')} className="h-full border-2 border-dashed border-slate-600 rounded-lg flex flex-col justify-end items-center p-2 relative">
            <div className="w-10 h-10 bg-yellow-500 rounded-md"></div>
            <span className="text-sm mt-2">Moneda 2</span>
             {feedback?.target === 'pos2' && <span className={`absolute top-2 text-sm ${feedback.correct ? 'text-green-400' : 'text-red-400'}`}>{feedback.correct ? "Correcto" : "Incorrecto"}</span>}
        </div>

        {/* Placed forces */}
        {forces.map(force => {
            if (!force.placedAt) return null;
            let styles = {};
            if (force.placedAt === 'pos1') styles = { top: '30%', left: '16.66%', transform: 'translate(-50%, -50%)' };
            if (force.placedAt === 'fulcrum') styles = { top: '30%', left: '50%', transform: 'translate(-50%, -50%)' };
            if (force.placedAt === 'pos2') styles = { top: '30%', left: '83.33%', transform: 'translate(-50%, -50%)' };
            
            return (
                <div key={force.id} className="absolute flex flex-col items-center text-cyan-400" style={styles}>
                    {getForceIcon(force.id)}
                    <span>{force.label}</span>
                </div>
            )
        })}
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-bold text-center text-cyan-300 mb-4">Fuerzas Disponibles</h3>
        <div className="flex justify-center items-center space-x-8">
          {unplacedForces.map(force => (
            <div 
              key={force.id} 
              draggable 
              onDragStart={(e) => handleDragStart(e, force.id)}
              className="flex flex-col items-center p-4 border border-slate-700 rounded-lg cursor-grab active:cursor-grabbing bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              {getForceIcon(force.id)}
              <span className="mt-2 text-slate-300">{force.label}</span>
            </div>
          ))}
          {unplacedForces.length === 0 && <p className="text-green-400">¡Todas las fuerzas han sido ubicadas!</p>}
        </div>
      </div>
    </div>
  );
};

export default Phase2FBD;
