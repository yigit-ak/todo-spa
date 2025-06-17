export default function MainContent({ children, className = '', ...rest }) {
  return (
      <div className={`card-main-content ${className}`} {...rest}>
        {children}
      </div>
  );
}