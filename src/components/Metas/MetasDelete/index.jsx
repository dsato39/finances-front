"use client";
import * as S from "./style.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ptBR } from "date-fns/locale";
import { formatISO } from "date-fns";
import BASE_URL from "@/api/index.js";

export const MetasDelete = ({
  metaId,
  openModalList,
  closeModal,
  setSelectedIdDelete,
  setUpdate,
}) => {
  const [meta, setMeta] = useState();
  const [prazo, setPrazo] = useState();
  const [valor, setValor] = useState();
  const [userId, setUserId] = useState();
  const [open, setOpen] = useState(false);

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    if (name === "meta") setMeta(value);
    if (name === "prazo") setPrazo(value);
    if (name === "valor") setValor(value);
  };

  useEffect(() => {
    const getMeta = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/metas/${metaId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMeta(response.data.data.meta);
        setPrazo(response.data.data.prazo);
        setValor(response.data.data.valor);
        setUserId(response.data.data.user_id);
      } catch (error) {
        setNotification({
          open: true,
          message: error.response.data.message,
          severity: "error",
        });
      }
    };
    getMeta();
  }, [metaId]);

  const onSubmit = async (ev) => {
    ev.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${BASE_URL}/metas/${metaId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotification({
        open: true,
        message: `Meta excluída com sucesso!`,
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
        <S.DialogTitle>Excluir meta</S.DialogTitle>
        <S.DialogContent>
          <S.Form onSubmit={onSubmit}>
            <S.TextField
              name="meta"
              onChange={onChangeValue}
              variant="outlined"
              value={meta}
            />
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={ptBR}>
              <DatePicker
                value={prazo}
                onChange={(newValue) => setData(newValue)}
                sx={{ width: 223 }}
              />
            </LocalizationProvider>
            <S.TextField
              name="valor"
              onChange={onChangeValue}
              variant="outlined"
              value={valor}
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

export default MetasDelete;
