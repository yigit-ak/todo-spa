import type {HTMLAttributes, ReactNode} from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export default function HeadSideContent({children, className = '', ...rest}: Props) {
  return (
      <div className={`head-side-content ${className}`} {...rest}>
        {children}
      </div>
  );
}