export default function HeadMainContent({ children, className = '', ...rest }) {
  return (
      <div className={`container-head-main ${className}`} {...rest}>
        {children}
      </div>
  );
}