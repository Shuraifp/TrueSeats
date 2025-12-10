import React from 'react';

const LoadingSpinner: React.FC<{ msg: string }> = ({ msg }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      <p className="ml-4 text-white text-lg">{msg}</p>
    </div>
  );
};

export default LoadingSpinner;
