export default function SideContent({ children, className = '', ...rest }) {
  return (
      <div className={`side-content ${className}`} {...rest}>
        {children}
      </div>
  );
}