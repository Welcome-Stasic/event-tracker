import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "../styles/login.style";
import { useAuth } from "../hooks/account/useAuth.ts";

const LoginPage: React.FC = () => {
  const signIn = useAuth();
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [authMessage, setAuthMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signIn.mutate(
      { email: login, password },
      {
        onSuccess: () => {
          navigate("/users");
        },
        onError: (error) => {
          if (error?.message === "Обнаружен шпион") {
            setAuthMessage(
              "Доступ запрещен. Только для менеджеров и администраторов.",
            );
          } else {
            setAuthMessage("Неверный логин или пароль");
          }
          console.error(error);
        },
      },
    );
  };

  return (
    <S.Container>
      <S.Card>
        <S.Title>Вход в систему</S.Title>

        <S.Form onSubmit={handleSubmit}>
          <S.InputWrapper>
            <S.Input
              type="email"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder=" "
            />
            <S.Label>Почта</S.Label>
          </S.InputWrapper>

          <S.InputWrapper>
            <S.Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
            />
            <S.Label>Пароль</S.Label>
          </S.InputWrapper>

          {authMessage && <S.ErrorMessage>{authMessage}</S.ErrorMessage>}

          <S.SubmitButton type="submit">Войти</S.SubmitButton>
        </S.Form>
      </S.Card>
    </S.Container>
  );
};

export default LoginPage;
