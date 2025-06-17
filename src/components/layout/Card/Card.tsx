import './Card.scss';

interface Props {
  children: any;
  className: string;
}

export default function Card({ children, className = '', ...rest }: Props) {
  return (
      <div
          className={`card ${className}`}
          {...rest}
      >
        {children}
      </div>
  );
}
