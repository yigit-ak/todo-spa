import type {HTMLAttributes, ReactNode} from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export default function HeadMainContent({children, className = '', ...rest}: Props) {
  return (
      <div className={`head-main-content ${className}`} {...rest}>
        {children}
      </div>
  );
}