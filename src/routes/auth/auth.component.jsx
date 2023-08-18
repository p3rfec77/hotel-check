import { AuthForm } from "../../components";

import "./auth.styles.scss";

export const Auth = () => {
  return (
    <section className="auth-container">
      <AuthForm />
      <div className="background">
        <div className="field" />
      </div>
    </section>
  );
};
