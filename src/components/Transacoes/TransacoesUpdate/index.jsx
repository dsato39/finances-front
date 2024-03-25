"use client";
import * as S from "./style.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ptBR } from "date-fns/locale";
import { formatISO } from "date-fns";

export const TransacoesUpdate = ({
  transacaoId,
  openModalList,
  closeModal,
  setSelectedIdEdit,
  setUpdate,
}) => {
  const [data, setData] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState(0);
  const [categoria_id, setCategoria_Id] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [userId, setUserId] = useState();
  const [open, setOpen] = useState(false);

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
        setCategoria_Id(response.data.data.categoria_id);
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
      const response = await axios.put(
        `http://localhost:8080/transacoes/${transacaoId}`,
        {
          data: formatISO(data, { representation: "date", locale: ptBR }),
          descricao,
          valor,
          categoria_id,
          user_id: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNotification({
        open: true,
        message: `Transação atualizada com sucesso!`,
        severity: "success",
      });
      handleCloseModal();
    } catch (error) {
      console.log(error);
      setNotification({
        open: true,
        message: error.response.data.error,
        severity: "error",
      });
    }
  };

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
    setSelectedIdEdit(null);
    setUpdate(true);
  };

  return (
    <>
      <S.Dialog open={open} onClose={handleCloseModal}>
        <S.DialogTitle>Editar Transação</S.DialogTitle>
        <S.DialogContent>
          <S.Form onSubmit={onSubmit}>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={ptBR}>
              <DatePicker
                value={data}
                onChange={(newValue) => setData(newValue)}
                sx={{ width: 223 }}
              />
            </LocalizationProvider>
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
            <S.FormControl sx={{ m: 1, minWidth: 223 }}>
              <S.InputLabel id="categoria">Categoria</S.InputLabel>
              <S.Select
                labelId="categoria"
                id="categoria_select"
                name="categoria"
                value={categoria_id}
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
        </S.DialogContent>
        <S.DialogActions>
          <S.Button onClick={handleCloseModal}>Cancelar</S.Button>
          <S.Button variant="contained" type="submit" onClick={onSubmit}>
            Enviar
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

export default TransacoesUpdate;
