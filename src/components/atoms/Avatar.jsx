const Avatar = ({ 
  src, 
  alt, 
  size = 'md', 
  className = '',
  fallback
}) => {
  const sizes = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
    '2xl': 'w-24 h-24'
  };

  const textSizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl'
  };

  return (
    <div
      className={`
        ${sizes[size]}
        rounded-full bg-surface overflow-hidden flex items-center justify-center
        ${className}
      `}
    >
      {src ? (
        <img
          src={src}
          alt={alt || 'Avatar'}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className={`${textSizes[size]} text-gray-500 font-medium`}>
          {fallback || alt?.[0]?.toUpperCase() || '?'}
        </span>
      )}
    </div>
  );
};

export default Avatar;