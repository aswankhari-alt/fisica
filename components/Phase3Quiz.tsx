
import React, { useState, useMemo, FormEvent } from 'react';
import Modal from './Modal';

interface Phase3QuizProps {
  onComplete: () => void;
  teamNumber: number;
}

interface Puzzle {
    id: number;
    question: string;
    answer: number;
}

const puzzles: Puzzle[] = [
    { id: 1, question: "Si 3 monedas se colocan a 5 cm a la izquierda del fulcro (posición -5), ¿en qué posición a la derecha debes colocar 1 moneda para equilibrar?", answer: 15 },
    { id: 2, question: "Una moneda está en la posición +8. Otra está en -4. ¿Dónde debes colocar una tercera moneda para lograr el equilibrio?", answer: -4 },
    { id: 3, question: "Dos monedas están en la posición -10. ¿Cuántas monedas debes colocar en la posición +5 para equilibrar?", answer: 4 },
];

const Phase3Quiz: React.FC<Phase3QuizProps> = ({ onComplete, teamNumber }) => {
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showFeedback, setShowFeedback] = useState<{correct: boolean, message: string} | null>(null);

  const currentPuzzle = useMemo(() => puzzles[currentPuzzleIndex], [currentPuzzleIndex]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const answerNum = parseFloat(userAnswer);

    if (answerNum === currentPuzzle.answer) {
      setCorrectAnswers(c => c + 1);
      setShowFeedback({correct: true, message: '¡Respuesta Correcta! Desbloqueando fragmento del manual...'});
      setTimeout(() => {
          setShowFeedback(null);
          setUserAnswer('');
          if (currentPuzzleIndex < puzzles.length - 1) {
              setCurrentPuzzleIndex(i => i + 1);
          } else {
              // Quiz complete
          }
      }, 2000);
    } else {
      setShowFeedback({correct: false, message: 'Cálculo incorrecto. Revisa el principio de torques: τ_izquierda = τ_derecha.'});
      setTimeout(() => setShowFeedback(null), 3000);
    }
  };
  
  const isQuizComplete = correctAnswers === puzzles.length;

  return (
    <div className="p-6 bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-lg shadow-2xl shadow-cyan-500/10 text-center">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-cyan-400 font-orbitron">Fase III: Principios Inquebrantables</h2>
        <p className="text-slate-400">Equipo de Ingeniería N° {teamNumber}</p>
        <p className="text-slate-300 mt-2">Responde los acertijos para desbloquear el manual secreto de ingeniería espacial.</p>
      </div>

      <div className="bg-slate-900/50 p-8 rounded-lg max-w-2xl mx-auto">
        <div className="mb-4">
            <h3 className="text-xl text-cyan-300 font-orbitron">Principios de Equilibrio Estático</h3>
            <p className="text-2xl font-mono text-yellow-400 my-2">ΣF = 0 &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp; Στ = 0</p>
        </div>
        
        {!isQuizComplete ? (
            <div>
                <p className="text-lg text-slate-200 mb-4">{currentPuzzle.question}</p>
                <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
                    <input 
                        type="number"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        className="bg-slate-700 border border-slate-500 text-white text-center text-lg rounded-md p-2 w-48 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                        placeholder="Tu respuesta"
                        required
                    />
                    <button type="submit" className="bg-cyan-500 text-slate-900 font-bold py-2 px-6 rounded-md hover:bg-cyan-400 transition-colors disabled:bg-slate-600">
                        Enviar Cálculo
                    </button>
                </form>
                {showFeedback && (
                    <div className={`mt-4 text-lg ${showFeedback.correct ? 'text-green-400' : 'text-red-400'}`}>
                        {showFeedback.message}
                    </div>
                )}
            </div>
        ) : (
             <div className="text-center text-green-400 animate-fade-in">
                <h3 className="text-2xl font-bold font-orbitron">¡Manual Desbloqueado!</h3>
                <p className="mt-2 text-slate-200">Has demostrado maestría en los principios abstractos. Preparado para la aplicación final.</p>
            </div>
        )}
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-slate-300">Progreso del Manual</h3>
        <div className="w-full bg-slate-700 rounded-full h-4 mt-2">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-4 rounded-full transition-all duration-500" style={{width: `${(correctAnswers/puzzles.length)*100}%`}}></div>
        </div>
        <p className="text-sm text-slate-400 mt-1">{correctAnswers} / {puzzles.length} fragmentos desbloqueados.</p>
      </div>

      {isQuizComplete && (
        <div className="mt-8">
            <button onClick={onComplete} className="bg-green-500 text-white font-bold py-3 px-8 rounded-md hover:bg-green-400 transition-all duration-300 shadow-lg shadow-green-500/20 transform hover:scale-105">
                Proceder a la Misión Final
            </button>
        </div>
      )}
    </div>
  );
};

export default Phase3Quiz;
