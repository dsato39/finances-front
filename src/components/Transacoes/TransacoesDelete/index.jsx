"use client";
import * as S from "./style.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

export const TransacoesDelete = ({
  transacaoId,
  openModalList,
  closeModal,
  setSelectedIdDelete,
  setUpdate,
}) => {
  const [data, setData] = useState();
  const [descricao, setDescricao] = useState();
  const [valor, setValor] = useState();
  const [categoria_id, setCategoria_Id] = useState("");
  const [userId, setUserId] = useState();

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    if (name === "data") setData(value);
    if (name === "descricao") setDescricao(value);
    if (name === "valor") setValor(value);
    if (name === "categoria") setCategoria_Id(value);
  };

  useEffect(() => {
    const getTransacao = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8080/transacoes/${transacaoId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data.data.data);
        setDescricao(response.data.data.descricao);
        setValor(response.data.data.valor);
        setCategoria_Id(response.data.data.categoria);
        setUserId(response.data.data.user_id);
      } catch (error) {
        setNotification({
          open: true,
          message: error.response.data.message,
          severity: "error",
        });
      }
    };
    getTransacao();
  }, [transacaoId]);

  const onSubmit = async (ev) => {
    ev.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:8080/transacoes/${transacaoId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNotification({
        open: true,
        message: `Transação excluída com sucesso!`,
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
        <S.DialogTitle>Excluir Transação</S.DialogTitle>
        <S.DialogContent>
          <S.Form onSubmit={onSubmit}>
            <S.TextField
              name="data"
              label="Data"
              value={data}
              variant="outlined"
            />
            <S.TextField
              name="descricao"
              onChange={onChangeValue}
              label="Descrição"
              value={descricao}
              variant="outlined"
            />
            <S.TextField
              name="valor"
              onChange={onChangeValue}
              label="Valor"
              value={valor}
              variant="outlined"
            />
            <S.TextField
              name="categoria"
              onChange={onChangeValue}
              label="Categoria"
              value={categoria_id}
              variant="outlined"
            />
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

export default TransacoesDelete;
