import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { IconEye, IconEyeOff } from "../icon/icons";
import { RouteName } from "../router/routes";
import { useAuth } from "../hooks/account/useAuth";
import * as S from "../styles/styles.LoginFormPage";
import { useStore } from "../store/storeProvider";

const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
// const passwordRegex =
//   /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]{6,}$/;
const passwordRegex = /^.{4,}$/;

const LoginForm: React.FC = observer(() => {
  const signIn = useAuth();
  const navigate = useNavigate();
  const { themeStore } = useStore();
  const theme = themeStore.theme;
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isFormFilled = login.trim() !== "" && password.trim() !== "";

  const validate = () => {
    setLoginError(false);
    setPasswordError(false);

    let valid = true;
    if (!emailRegex.test(login)) {
      setLoginError(true);
      valid = false;
    }
    if (!passwordRegex.test(password)) {
      setPasswordError(true);
      valid = false;
    }
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormFilled || !validate()) return;

    signIn.mutate(
      { email: login, password },
      {
        onSuccess: () => {
          navigate(RouteName.ACCOUNT);
        },
        onError: (error) => {
          console.error(error);
        },
      },
    );
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
    setLoginError(false);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError(false);
  };

  const authError = signIn.isError && signIn.error;

  return (
    <S.LoginContainer>
      <S.Form onSubmit={handleSubmit}>
        {/* ловушки для автозаполнения */}
        <input
          type="text"
          autoComplete="username"
          tabIndex={-1}
          style={{
            position: "absolute",
            left: "-9999px",
            height: 0,
            width: 0,
            opacity: 0,
          }}
        />
        <input
          type="password"
          autoComplete="current-password"
          tabIndex={-1}
          style={{
            position: "absolute",
            left: "-9999px",
            height: 0,
            width: 0,
            opacity: 0,
          }}
        />

        {/* Логин */}
        <div className="form-group">
          <S.InputWrapper theme={theme} error={!!authError || loginError}>
            <input
              type="email"
              id="login"
              name="login"
              autoComplete="off"
              value={login}
              onChange={handleLoginChange}
              disabled={signIn.isPending}
              required
              placeholder=" "
            />
            <label htmlFor="login">Логин</label>
          </S.InputWrapper>
        </div>

        {/* Пароль */}
        <div className="form-group">
          <S.InputWrapper theme={theme} error={!!authError || passwordError}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              autoComplete="off"
              value={password}
              onChange={handlePasswordChange}
              disabled={signIn.isPending}
              required
              placeholder=" "
            />
            <label htmlFor="password">Пароль</label>
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              style={{
                position: "absolute",
                right: 16,
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                fontSize: 18,
                color: "#A2ACB0",
              }}
              tabIndex={-1}
              aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
            >
              {showPassword ? <IconEye /> : <IconEyeOff />}
            </button>
          </S.InputWrapper>
        </div>

        {/* Сообщение об ошибке авторизации */}
        {authError && (
          <S.InputHint>
            Почта или пароль не правильные
          </S.InputHint>
        )}

        {/* Кнопка входа */}
        <S.SubmitButton theme={theme}
          type="submit"
          disabled={!isFormFilled || signIn.isPending}
        >
          {signIn.isPending ? "Вход..." : "Войти"}
        </S.SubmitButton>
      </S.Form>
    </S.LoginContainer>
  );
});

export default LoginForm;
