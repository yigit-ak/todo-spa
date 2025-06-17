export default function HeadSideContent({ children, className = '', ...rest }) {
  return (
      <div className={`head-side-content ${className}`} {...rest}>
        {children}
      </div>
  );
}