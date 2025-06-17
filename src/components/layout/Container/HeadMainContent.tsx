export default function HeadMainContent({ children, className = '', ...rest }) {
  return (
      <div className={`head-main-content ${className}`} {...rest}>
        {children}
      </div>
  );
}