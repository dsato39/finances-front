"use client";
import * as S from "./style.jsx";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import BASE_URL from "@/api/index.js";

export const LoginForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });
      localStorage.setItem("token", response.data.data.token);
      setNotification({
        open: true,
        message: `Usuário ${email} autenticado com sucesso!`,
        severity: "success",
      });
      router.push("/dashboard");
    } catch (error) {
      setNotification({
        open: true,
        message: error.response.data.error,
        severity: "error",
      });
    }
  };

  const handleClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotification({
      open: false,
      message: "",
      severity: "",
    });
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <S.Form onSubmit={onSubmit}>
        <S.Typography variant="h1" style={{ marginBottom: "40px" }}>
          Login
        </S.Typography>
        <S.TextField
          name="email"
          onChange={onChangeValue}
          label="E-mail"
          variant="outlined"
        />
        <S.FormControl sx={{ m: 1, width: "223px" }} variant="outlined">
          <S.InputLabel htmlFor="outlined-adornment-password">
            Senha
          </S.InputLabel>
          <S.OutlinedInput
            onChange={onChangeValue}
            name="password"
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <S.InputAdornment position="end">
                <S.IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end">
                  {showPassword ? <S.VisibilityOff /> : <S.Visibility />}
                </S.IconButton>
              </S.InputAdornment>
            }
            label="Senha"
          />
        </S.FormControl>
        <S.Button variant="contained" type="submit">
          Enviar
        </S.Button>
        <S.Link href="/register">Criar uma conta</S.Link>
      </S.Form>
      <S.Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={handleClose}>
        <S.Alert
          onClose={handleClose}
          severity={notification.severity}
          variant="filled">
          {notification.message}
        </S.Alert>
      </S.Snackbar>
    </>
  );
};

export default LoginForm;
