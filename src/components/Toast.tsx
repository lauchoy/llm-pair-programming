import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, type, onClose, duration = 5000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const styles = {
    success: 'bg-green-50',
    error: 'bg-red-50',
    info: 'bg-blue-50'
  }[type];

  return (
    <div className={`fixed bottom-8 right-8 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${styles}`}>
      <div className="flex items-start p-4">
        <p className="flex-1 font-bold uppercase">{message}</p>
        <button
          onClick={onClose}
          className="ml-4 hover:opacity-75"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}