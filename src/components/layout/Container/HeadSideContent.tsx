export default function HeadSideContent({ children, className = '', ...rest }) {
  return (
      <div className={`container-head-side ${className}`} {...rest}>
        {children}
      </div>
  );
}