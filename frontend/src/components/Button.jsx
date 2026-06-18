export default function Button({ variant = 'primary', size = 'sm', children, className = '', ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 cursor-pointer';
  const variants = {
    primary: 'bg-zinc-900 text-white hover:bg-zinc-800 focus:ring-zinc-900',
    secondary: 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 focus:ring-zinc-400',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    ghost: 'text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100 focus:ring-zinc-400',
  };
  const sizes = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
  };

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
}
