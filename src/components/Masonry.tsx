import React, { ReactNode } from 'react';

interface MasonryLayoutProps {
  children: ReactNode;
}

export const MasonryLayout: React.FC<MasonryLayoutProps> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {children}
    </div>
  );
};

interface MasonryItemProps {
  children: ReactNode;
  className?: string;
}

export const MasonryItem: React.FC<MasonryItemProps> = ({ children, className }) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      {children}
    </div>
  );
};