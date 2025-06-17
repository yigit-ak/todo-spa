export default function SideContent({ children, className = '', ...rest }) {
  return (
      <div className={`card-side-content ${className}`} {...rest}>
        {children}
      </div>
  );
}