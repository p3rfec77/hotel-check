import "./button.styles.scss";

export const Button = ({ children, ...props }) => {
  return (
    <button className="pretty-btn" {...props}>
      {children}
    </button>
  );
};
