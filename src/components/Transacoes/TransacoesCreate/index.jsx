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

export const TransacoesCreate = ({ openModal, closeModal, setUpdate }) => {
  // useState para onChange nos campos do form
  const [data, setData] = useState();
  const [descricao, setDescricao] = useState();
  const [valor, setValor] = useState();
  const [categoria, setCategoria] = useState("");
  // useState para listar categorias no campo Select
  const [categorias, setCategorias] = useState([]);
  // useState para para alterar o estado do openModal e closeModal
  const [open, setOpen] = useState(false);

  // useEffect e variável criados para controlar a abertura e fechamento do modal "TransacoesCreate"
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

  // Variáveis criadas para controlar a abertura da notificação
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "",
  });

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

  // Variável para receber as alterações no form e atualizar o estado da variável
  const onChangeValue = (e) => {
    const { name, value } = e.target;
    if (name === "data") setData(value);
    if (name === "descricao") setDescricao(value);
    if (name === "valor") setValor(value);
    if (name === "categoria") setCategoria(value);
  };

  // submit para a rota post do formulário
  const onSubmit = async (ev) => {
    ev.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/transacoes",
        {
          data: formatISO(data, { representation: "date", locale: ptBR }),
          descricao,
          valor,
          categoria_id: categoria,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNotification({
        open: true,
        message: `Transação criada com sucesso!`,
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

  // useEffect para get da tabela de categorias e listar no campo Select
  useEffect(() => {
    const getCategorias = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/categories", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategorias(response.data.data);
      } catch (error) {
        setNotification({
          open: true,
          message: error.response.data.message,
          severity: "error",
        });
      }
    };
    getCategorias();
  }, []);

  return (
    <>
      <Dialog open={open} onClose={handleCloseModal}>
        <DialogTitle>Nova Transação</DialogTitle>
        <DialogContent>
          <S.Form onSubmit={onSubmit}>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={ptBR}>
              <DatePicker
                onChange={(newValue) => setData(newValue)}
                sx={{ width: 223 }}
              />
            </LocalizationProvider>
            <S.TextField
              name="descricao"
              onChange={onChangeValue}
              label="Descrição"
              variant="outlined"
            />
            <S.TextField
              name="valor"
              onChange={onChangeValue}
              label="Valor"
              variant="outlined"
            />
            <S.FormControl sx={{ m: 1, minWidth: 223 }}>
              <S.InputLabel id="categoria">Categoria</S.InputLabel>
              <S.Select
                labelId="categoria"
                id="categoria_select"
                name="categoria"
                value={categoria}
                label="Categoria"
                onChange={onChangeValue}>
                {categorias.map((categoria) => (
                  <S.MenuItem key={categoria.id} value={categoria.id}>
                    {categoria.categoria}
                  </S.MenuItem>
                ))}
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
};

export default TransacoesCreate;
