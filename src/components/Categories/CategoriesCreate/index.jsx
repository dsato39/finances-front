"use client";
import * as S from "./style.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import BASE_URL from "@/api/index.js";

export const CategoriesCreate = ({ openModal, closeModal, setUpdate }) => {
  const [classificacao, setClassificacao] = useState();
  const [categoria, setCategoria] = useState();
  const [tipo, setTipo] = useState();

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    if (name === "classificacao") setClassificacao(value);
    if (name === "categoria") setCategoria(value);
    if (name === "tipo") setTipo(value);
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${BASE_URL}/categories`,
        { classificacao, categoria, tipo },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNotification({
        open: true,
        message: `Categoria ${classificacao} criada com sucesso!`,
        severity: "success",
      });
      handleCloseModal();
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

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (openModal) {
      setOpen(true);
    }
  }, [openModal]);

  const handleCloseModal = () => {
    setOpen(false);
    closeModal(false);
    setUpdate(true);
  };

  return (
    <>
      <Dialog open={open} onClose={handleCloseModal}>
        <DialogTitle>Nova Categoria</DialogTitle>
        <DialogContent>
          <S.Form onSubmit={onSubmit}>
            <div>
              <S.TextField
                name="classificacao"
                onChange={onChangeValue}
                label="Classificacao"
                variant="outlined"
              />
            </div>
            <div>
              <S.TextField
                name="categoria"
                onChange={onChangeValue}
                label="Categoria"
                variant="outlined"
              />
            </div>
            <S.FormControl sx={{ m: 1, minWidth: 223 }}>
              <S.InputLabel id="tipo">Tipo</S.InputLabel>
              <S.Select
                labelId="tipo"
                id="tipo_select"
                name="tipo"
                value={tipo}
                label="Tipo"
                onChange={onChangeValue}>
                <S.MenuItem value="Despesa">Despesa</S.MenuItem>
                <S.MenuItem value="Receita">Receita</S.MenuItem>
              </S.Select>
            </S.FormControl>
          </S.Form>
        </DialogContent>
        <DialogActions>
          <S.Button onClick={handleCloseModal}>Cancelar</S.Button>
          <S.Button variant="contained" type="submit" onClick={onSubmit}>
            Enviar
          </S.Button>
        </DialogActions>
      </Dialog>

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

  // return (
  // <>
  //     <S.Form onSubmit={ onSubmit }>
  //         <h1>Criar categoria</h1>
  //         <div><S.TextField name='classificacao' onChange={ onChangeValue } label="Classificacao" variant='outlined' /></div>
  //         <div><S.TextField name='categoria' onChange={ onChangeValue } label="Categoria" variant='outlined' /></div>
  //         <div><S.TextField name='tipo' onChange={ onChangeValue } label="Tipo" variant='outlined' /></div>
  //         <div><S.Button variant="contained" type='submit' >Enviar</S.Button></div>
  //     </S.Form>
  // <S.Snackbar open={notification.open} autoHideDuration={3000} onClose={handleClose}>
  // <S.Alert onClose={handleClose} severity={notification.severity} variant='filled'>
  //     {notification.message}
  // </S.Alert>
  // </S.Snackbar>
  // </>
  // )
};

export default CategoriesCreate;
