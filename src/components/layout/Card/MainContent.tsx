export default function MainContent({ children, className = '', ...rest }) {
  return (
      <div className={`main-content ${className}`} {...rest}>
        {children}
      </div>
  );
}