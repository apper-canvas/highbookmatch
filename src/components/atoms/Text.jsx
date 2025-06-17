const Text = ({ 
  children, 
  variant = 'body', 
  size = 'base', 
  color = 'primary', 
  weight = 'normal',
  className = '',
  as: Component = 'p',
  ...props 
}) => {
  const variants = {
    display: 'font-display',
    body: 'font-sans',
    heading: 'font-heading'
  };

  const sizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl'
  };

  const colors = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent',
    muted: 'text-gray-600',
    light: 'text-gray-400',
    white: 'text-white',
    success: 'text-success',
    warning: 'text-warning',
    error: 'text-error'
  };

  const weights = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  };

  return (
    <Component
      className={`
        ${variants[variant]}
        ${sizes[size]}
        ${colors[color]}
        ${weights[weight]}
        ${className}
      `}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Text;