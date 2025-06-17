export default function Body({ children, className = '', ...rest }) {
  return (
      <div className={`container-body ${className}`} {...rest}>
        {children}
      </div>
  );
}