
import React from 'react';

interface ModalProps {
  title: string;
  children: React.ReactNode;
  onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, children, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in-fast">
      <div className="bg-slate-800 border border-cyan-500/50 rounded-lg p-6 max-w-lg w-full mx-4 shadow-2xl shadow-cyan-500/20">
        <h2 className="text-2xl font-bold text-cyan-400 mb-4 font-orbitron">{title}</h2>
        <div className="text-slate-300 mb-6">{children}</div>
        <div className="text-right">
          <button
            onClick={onConfirm}
            className="bg-cyan-500 text-slate-900 font-bold py-2 px-6 rounded-md hover:bg-cyan-400 transition-colors"
          >
            Continuar
          </button>
        </div>
      </div>
      <style>{`
        .animate-fade-in-fast { animation: fadeIn 0.2s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
};

export default Modal;
