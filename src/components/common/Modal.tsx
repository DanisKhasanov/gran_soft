import React, { type ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  className = '',
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'w-80 max-w-sm',
    md: 'w-96 max-w-md',
    lg: 'w-[500px] max-w-lg',
    xl: 'w-[600px] max-w-xl',
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className={`bg-white rounded-lg p-6 ${sizeClasses[size]} mx-4 ${className}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          {showCloseButton && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          )}
        </div>
        
        {children}
      </div>
    </div>
  );
};

export default Modal;
