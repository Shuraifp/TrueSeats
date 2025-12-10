import React from 'react';
import { useField } from 'formik';

interface CheckboxFieldProps {
  name: string;
  label: string;
  [key: string]: any; 
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({ label, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <div className="mb-4">
      <label className="flex items-center space-x-2 text-gray-300">
        <input
          type="checkbox"
          {...field}
          {...props}
          className="form-checkbox h-5 w-5 bg-gray-700 border-gray-600 rounded focus:ring-blue-400"
        />
        <span>{label}</span>
      </label>
      {meta.touched && meta.error ? (
        <p className="text-red-500 text-xs italic mt-1">{meta.error}</p>
      ) : null}
    </div>
  );
};

export default CheckboxField;
