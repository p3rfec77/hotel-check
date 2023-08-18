import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logIn } from "../../store/user.slice";

import { Button } from "../button/button.component";
import { FormWrap } from "../form-wrap/form-wrap.component";

import "./auth-form.styles.scss";

export const AuthForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    navigate("/");
    dispatch(logIn(data.login));
  };

  return (
    <FormWrap className="form-container-auth">
      <h3 className="form-header">Simple Hotel Check</h3>

      <form className="form" id="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <label
          className="form-label"
          style={errors?.login && { color: "#EB1717" }}
        >
          Логин
          <input
            className="form-input"
            {...register("login", {
              required: "Заполните данное поле",
              pattern: {
                value: /.+@.+\..+/i,
                message: "E-mail введен некорректно",
              },
            })}
            style={errors?.login && { color: "#EB1717" }}
          />
          {errors?.login && (
            <span className="error">{errors.login.message}</span>
          )}
        </label>

        <label
          className="form-label"
          style={errors?.password && { color: "#EB1717" }}
        >
          Пароль
          <input
            className="form-input"
            type="password"
            {...register("password", {
              required: "Заполните данное поле",
              minLength: {
                value: "8",
                message: "Пароль должен быть не меньше 8-ми символов",
              },
              pattern: {
                value: /^[^а-яё]+$/iu,
                message: "Нельзя использовать кириллицу",
              },
            })}
            style={errors?.password && { color: "#EB1717" }}
          />
          {errors?.password && (
            <span className="error">{errors.password.message}</span>
          )}
        </label>
      </form>

      <Button type="submit" form="auth-form">
        Войти
      </Button>
    </FormWrap>
  );
};
