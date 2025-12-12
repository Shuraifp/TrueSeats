import React from 'react';

const LoadingSpinner: React.FC<{ msg: string }> = ({ msg }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      <p className="ml-4 text-gray-700 text-lg dark:text-white">{msg}</p>
    </div>
  );
};

export default LoadingSpinner;
