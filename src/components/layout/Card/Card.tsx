import type {HTMLAttributes, ReactNode} from "react";
import "./Card.scss";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export default function Card({children, className = "", ...rest}: Props & HTMLAttributes<HTMLDivElement>) {
  return (
      <div className={`card ${className}`} {...rest}>
        {children}
      </div>
  );
}
