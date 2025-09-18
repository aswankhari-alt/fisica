
import React, { useState, useEffect, useCallback } from 'react';
import { GamePhase } from './types';
import PhaseIntro from './components/PhaseIntro';
import Phase1Seesaw from './components/Phase1Seesaw';
import Phase2FBD from './components/Phase2FBD';
import Phase3Quiz from './components/Phase3Quiz';
import Phase4Bridge from './components/Phase4Bridge';
import EndScreen from './components/EndScreen';

const App: React.FC = () => {
  const [gamePhase, setGamePhase] = useState<GamePhase>(GamePhase.Intro);
  const [teamNumber, setTeamNumber] = useState<number>(0);

  useEffect(() => {
    setTeamNumber(Math.floor(Math.random() * 900) + 100);
  }, []);

  const advanceToPhase = useCallback((phase: GamePhase) => {
    setGamePhase(phase);
  }, []);

  const renderPhase = () => {
    switch (gamePhase) {
      case GamePhase.Intro:
        return (
          <PhaseIntro
            title="Misión: Puente Estelar INA-73"
            narrative={`Año 2147. La humanidad ha colonizado el planeta Kepler-186f. Pero sus cañones geológicos son un peligro constante. Eres parte del Equipo de Ingeniería N° ${teamNumber}, con la misión de diseñar un puente inquebrantable para la supervivencia de los colonos. Tu entrenamiento comienza ahora.`}
            buttonText="Iniciar Fase I"
            onNext={() => advanceToPhase(GamePhase.Phase1)}
          />
        );
      case GamePhase.Phase1:
        return <Phase1Seesaw onComplete={() => advanceToPhase(GamePhase.Phase1End)} teamNumber={teamNumber} />;
      case GamePhase.Phase1End:
         return (
          <PhaseIntro
            title="Fase I Completada: El Balancín Espacial"
            narrative="Has dominado el principio básico del equilibrio: el torque. El torque es una 'fuerza de giro' que depende de la fuerza aplicada y la distancia al punto de giro (fulcro). Para lograr el equilibrio, la suma de todos los torques debe ser cero (Στ = 0)."
            buttonText="Iniciar Fase II"
            onNext={() => advanceToPhase(GamePhase.Phase2)}
          />
        );
      case GamePhase.Phase2:
        return <Phase2FBD onComplete={() => advanceToPhase(GamePhase.Phase2End)} teamNumber={teamNumber} />;
      case GamePhase.Phase2End:
         return (
          <PhaseIntro
            title="Fase II Completada: Lenguaje de Ingenieros"
            narrative="Excelente. Has construido un Diagrama de Cuerpo Libre (DCL). Este diagrama es crucial para visualizar todas las fuerzas que actúan sobre un objeto. Las flechas hacia abajo representan pesos (fuerzas), y la flecha hacia arriba es la 'fuerza normal' o de reacción del soporte."
            buttonText="Iniciar Fase III"
            onNext={() => advanceToPhase(GamePhase.Phase3)}
          />
        );
      case GamePhase.Phase3:
        return <Phase3Quiz onComplete={() => advanceToPhase(GamePhase.Phase3End)} teamNumber={teamNumber} />;
       case GamePhase.Phase3End:
         return (
          <PhaseIntro
            title="Fase III Completada: Principios Inquebrantables"
            narrative="Tu conocimiento de los principios fundamentales es sólido. Has demostrado que entiendes las dos condiciones del equilibrio estático: la suma de todas las fuerzas es cero (ΣF = 0) y la suma de todos los torques es cero (Στ = 0). Estás listo para el desafío final."
            buttonText="Iniciar Fase IV"
            onNext={() => advanceToPhase(GamePhase.Phase4)}
          />
        );
      case GamePhase.Phase4:
        return <Phase4Bridge onComplete={(success) => advanceToPhase(success ? GamePhase.EndSuccess : GamePhase.EndFailure)} teamNumber={teamNumber} />;
      case GamePhase.EndSuccess:
        return <EndScreen success={true} onRestart={() => advanceToPhase(GamePhase.Intro)} />;
      case GamePhase.EndFailure:
        return <EndScreen success={false} onRestart={() => advanceToPhase(GamePhase.Intro)} />;
      default:
        return <div>Fase desconocida</div>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl mx-auto">
        {renderPhase()}
      </div>
    </div>
  );
};

export default App;
