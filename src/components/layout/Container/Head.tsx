export default function Head({ children, className = '', ...rest }) {
  return (
      <div className={`container-head ${className}`} {...rest}>
        {children}
      </div>
  );
}