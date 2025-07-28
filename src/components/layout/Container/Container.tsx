import "./Container.scss"
import type {HTMLAttributes, ReactNode} from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export default function Container({children, className = '', ...rest}: Props) {
  return (
      <div className={`container ${className}`} {...rest}>
        {children}
      </div>
  );
}