import type {HTMLAttributes, ReactNode} from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export default function SideContent({children, className = '', ...rest}: Props) {
  return (
      <div className={`side-content ${className}`} {...rest}>
        {children}
      </div>
  );
}