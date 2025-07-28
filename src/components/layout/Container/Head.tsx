import type {HTMLAttributes, ReactNode} from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export default function Head({children, className = '', ...rest}: Props) {
  return (
      <div className={`head ${className}`} {...rest}>
        {children}
      </div>
  );
}