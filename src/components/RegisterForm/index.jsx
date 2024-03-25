"use client";
import * as S from "./style.jsx";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export const RegisterForm = () => {
  const router = useRouter();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [cellphone, setCellphone] = useState();
  const [password, setPassword] = useState();

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    if (name === "email") setEmail(value);
    if (name === "cellphone") setCellphone(value);
    if (name === "password") setPassword(value);
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/auth/register", {
        name,
        email,
        cellphone,
        password,
      });
      localStorage.setItem("token", response.data.data.token);
      console.log("response", response);
      setNotification({
        open: true,
        message: `Usuário ${email} criado com sucesso!`,
        severity: "success",
      });
      router.push("/login");
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
    setNotification(false);
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
          Registro
        </S.Typography>
        <S.TextField
          name="name"
          onChange={onChangeValue}
          label="Nome"
          variant="outlined"
        />
        <S.TextField
          name="email"
          onChange={onChangeValue}
          label="E-mail"
          variant="outlined"
        />
        <S.TextField
          name="cellphone"
          onChange={onChangeValue}
          label="Celular"
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
        <div>
          Já possui uma conta? <S.Link href="/">Faça login aqui</S.Link>
        </div>
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

export default RegisterForm;
