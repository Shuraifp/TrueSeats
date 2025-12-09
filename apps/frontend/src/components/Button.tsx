import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'logout';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className, ...props }) => {
  const baseStyles = "font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-200 border";
  const variants = {
    primary: "bg-blue-600 border-gray-400 bg-opacity-50 hover:bg-blue-700 hover:bg-opacity-75 text-white shadow-md hover:shadow-lg transform hover:scale-105 hover:border-gray-300 hover:shadow-[0_0_8px_rgba(255,215,0,0.7)]",
    secondary: "bg-gray-600 border-blue-400 bg-opacity-50 hover:bg-gray-700 hover:bg-opacity-75 text-white shadow-md hover:shadow-lg transform hover:scale-105 hover:border-blue-300 hover:shadow-[0_0_8px_rgba(255,215,0,0.7)]",
    danger: "bg-red-600 border-red-500 bg-opacity-50 hover:bg-red-700 hover:bg-opacity-75 text-white shadow-md hover:shadow-lg transform hover:scale-105 hover:border-blue-300 hover:shadow-[0_0_8px_rgba(255,215,0,0.7)]",
    logout: "bg-gray-600 border-red-500 bg-opacity-50 hover:bg-gray-700 hover:bg-opacity-75 text-white shadow-md hover:shadow-lg transform hover:scale-105 hover:border-red-300 hover:shadow-[0_0_8px_rgba(255,215,0,0.7)]",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
