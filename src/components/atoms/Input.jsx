import { useState } from 'react';

const Input = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  error, 
  disabled = false,
  className = '',
  ...props 
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        disabled={disabled}
        className={`
          w-full px-4 py-3 border-2 rounded-lg transition-all duration-200
          ${focused ? 'border-secondary' : 'border-surface'}
          ${error ? 'border-error' : ''}
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
          focus:outline-none focus:border-secondary
          placeholder-transparent
        `}
        placeholder={placeholder}
        {...props}
      />
      
      {label && (
        <label
          className={`
            absolute left-4 transition-all duration-200 pointer-events-none
            ${focused || value 
              ? 'top-1 text-xs text-secondary' 
              : 'top-3 text-base text-gray-500'
            }
          `}
        >
          {label}
        </label>
      )}
      
      {error && (
        <p className="mt-1 text-sm text-error">{error}</p>
      )}
    </div>
  );
};

export default Input;