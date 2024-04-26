"use client";
import * as S from "./style.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "@/api/index.js";

export const CategoriesDelete = ({
  categoriaId,
  openModalList,
  closeModal,
  setSelectedIdDelete,
  setUpdate,
}) => {
  const [classificacao, setClassificacao] = useState();
  const [categoria, setCategoria] = useState();
  const [tipo, setTipo] = useState();
  const [userId, setUserId] = useState();
  const [open, setOpen] = useState(false);

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

  useEffect(() => {
    const getCategoria = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/categories/${categoriaId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setClassificacao(response.data.data.classificacao);
        setCategoria(response.data.data.categoria);
        setTipo(response.data.data.tipo);
        setUserId(response.data.data.user_id);
      } catch (error) {
        setNotification({
          open: true,
          message: error.response.data.message,
          severity: "error",
        });
      }
    };
    getCategoria();
  }, [categoriaId]);

  const onSubmit = async (ev) => {
    ev.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${BASE_URL}/categories/${categoriaId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNotification({
        open: true,
        message: `Categoria excluída com sucesso!`,
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

  useEffect(() => {
    if (openModalList) {
      setOpen(true);
    }
  }, [openModalList]);

  const handleCloseModal = () => {
    setOpen(false);
    closeModal(false);
    setSelectedIdDelete(null);
    setUpdate(true);
  };

  return (
    <>
      <S.Dialog open={open} onClose={handleCloseModal}>
        <S.DialogTitle>Excluir categoria</S.DialogTitle>
        <S.DialogContent>
          <S.Form onSubmit={onSubmit}>
            <S.TextField
              name="classificacao"
              onChange={onChangeValue}
              variant="outlined"
              value={classificacao}
            />
            <S.TextField
              name="categoria"
              onChange={onChangeValue}
              variant="outlined"
              value={categoria}
            />
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
        </S.DialogContent>
        <S.DialogActions>
          <S.Button onClick={handleCloseModal}>Cancelar</S.Button>
          <S.Button variant="contained" type="submit" onClick={onSubmit}>
            Excluir
          </S.Button>
        </S.DialogActions>
      </S.Dialog>
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

export default CategoriesDelete;
