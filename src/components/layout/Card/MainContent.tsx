import type {HTMLAttributes, ReactNode} from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export default function MainContent(
    {children, className = '', ...rest}: Props
) {
  return (
      <div className={`main-content ${className}`} {...rest}>
        {children}
      </div>
  );
}
