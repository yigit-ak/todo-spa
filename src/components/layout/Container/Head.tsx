export default function Head({ children, className = '', ...rest }) {
  return (
      <div className={`head ${className}`} {...rest}>
        {children}
      </div>
  );
}