import './Card.scss';

interface Props {
  children: any;
  className: string;
  toggleDetailView():void;
}

export default function Card({ children, className = '', toggleDetailView }) {
  return (
      <div className={`card ${className}`} onDoubleClick={toggleDetailView}>
        {children}
      </div>
  );
}
