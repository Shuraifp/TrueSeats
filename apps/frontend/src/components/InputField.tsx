import React from 'react';
import { useField } from 'formik';

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  [key: string]: any;
}

const InputField: React.FC<InputFieldProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-4">
      <label htmlFor={props.id || props.name} className="block text-gray-300 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        {...field}
        {...props}
        className={`shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-gray-100 placeholder-gray-400 leading-tight focus:outline-none focus:shadow-outline border-gray-600 ${
          meta.touched && meta.error ? 'border-red-500' : ''
        }`}
      />
      {meta.touched && meta.error ? (
        <p className="text-red-500 text-xs italic mt-1">{meta.error}</p>
      ) : null}
    </div>
  );
};

export default InputField;
