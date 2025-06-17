export default function Body({ children, className = '', ...rest }) {
  return (
      <div className={`body ${className}`} {...rest}>
        {children}
      </div>
  );
}