import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { CheckCircle2, Info, AlertCircle } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toasts } = useMarketplace();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 z-60 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center gap-2.5 p-3 rounded-lg shadow-lg text-xs font-semibold backdrop-blur-md transition-all ${
            toast.type === 'success'
              ? 'bg-emerald-900/95 text-white border border-emerald-700'
              : toast.type === 'error'
              ? 'bg-rose-900/95 text-white border border-rose-700'
              : 'bg-stone-900/95 text-white border border-stone-700'
          }`}
        >
          {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
          {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
          {toast.type === 'info' && <Info className="w-4 h-4 text-amber-400 shrink-0" />}
          <span className="leading-snug">{toast.text}</span>
        </div>
      ))}
    </div>
  );
};
