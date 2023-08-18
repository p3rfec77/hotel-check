import "./form-wrap.styles.scss";

export const FormWrap = ({ children, className }) => {
  return <div className={`form-container ${className}`}>{children}</div>;
};
