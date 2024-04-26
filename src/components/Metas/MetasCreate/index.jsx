"use client";
import * as S from "./style.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ptBR } from "date-fns/locale";
import { formatISO } from "date-fns";
import BASE_URL from "@/api/index.js";

export const MetasCreate = ({ openModal, closeModal, setUpdate }) => {
  const [meta, setMeta] = useState();
  const [prazo, setPrazo] = useState(new Date());
  const [valor, setValor] = useState();

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    if (name === "meta") setMeta(value);
    if (name === "valor") setValor(value);
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${BASE_URL}/metas`,
        {
          meta,
          prazo: formatISO(prazo, { representation: "date", locale: ptBR }),
          valor,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNotification({
        open: true,
        message: `Meta ${meta} criada com sucesso!`,
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
        <DialogTitle>Nova Meta</DialogTitle>
        <DialogContent>
          <S.Form onSubmit={onSubmit}>
            <S.TextField
              name="meta"
              onChange={onChangeValue}
              label="Meta"
              variant="outlined"
            />
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={ptBR}>
              <DatePicker
                onChange={(newValue) => setPrazo(newValue)}
                sx={{ width: 223 }}
              />
            </LocalizationProvider>
            <S.TextField
              name="valor"
              onChange={onChangeValue}
              label="Valor"
              variant="outlined"
            />
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
};

export default MetasCreate;
