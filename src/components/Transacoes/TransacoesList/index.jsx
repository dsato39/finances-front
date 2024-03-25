"use client";
import * as S from "./style.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TransacoesUpdate from "../TransacoesUpdate/index.jsx";
import TransacoesDelete from "../TransacoesDelete/index.jsx";
import TransacoesCreate from "@/components/Transacoes/TransacoesCreate";

export const TransacoesList = () => {
  const [transacoes, setTransacoes] = useState([]);
  const [openModalList, setOpenModalList] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [selectedIdEdit, setSelectedIdEdit] = useState();
  const [selectedIdDelete, setSelectedIdDelete] = useState();

  const [update, setUpdate] = useState(false);

  const [tipo, setTipo] = useState("Todas");

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "",
  });

  useEffect(() => {
    const getTransacoes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/transacoes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (tipo === "Todas") {
          setTransacoes(response.data.data);
        }
        if (tipo === "Receita") {
          const receitas = response.data.data.filter(
            (transacao) => transacao.categoria_tipo === "Receita"
          );
          setTransacoes(receitas);
        }
        if (tipo === "Despesa") {
          const despesas = response.data.data.filter(
            (transacao) => transacao.categoria_tipo === "Despesa"
          );
          setTransacoes(despesas);
        }
        setUpdate(false);
      } catch (error) {
        setNotification({
          open: true,
          message: error.response.data.message,
          severity: "error",
        });
      }
    };
    getTransacoes();
  }, [update, tipo]);

  return (
    <>
      <S.Button
        variant="contained"
        type="submit"
        onClick={() => setOpenModal(true)}>
        Nova transação
      </S.Button>
      <TransacoesCreate
        openModal={openModal}
        closeModal={setOpenModal}
        setUpdate={setUpdate}
      />
      <div style={{ gap: "20px", margin: "30px 0" }}>
        <S.Button
          variant="contained"
          style={{ marginRight: "10px" }}
          onClick={() => setTipo("Todas")}>
          Todas transações
        </S.Button>
        <S.Button
          variant="contained"
          style={{ marginRight: "10px" }}
          onClick={() => setTipo("Receita")}>
          Receitas
        </S.Button>
        <S.Button
          variant="contained"
          style={{ marginRight: "10px" }}
          onClick={() => setTipo("Despesa")}>
          Despesas
        </S.Button>
      </div>
      <S.TableContainer component={Paper}>
        <S.Table sx={{ minWidth: 650 }} aria-label="simple table">
          <S.TableHead>
            <S.TableRow>
              <S.TableCell align="center">Data</S.TableCell>
              <S.TableCell align="center">Categoria</S.TableCell>
              <S.TableCell align="center">Tipo</S.TableCell>
              <S.TableCell align="center">Descrição</S.TableCell>
              <S.TableCell align="center">Valor</S.TableCell>
              <S.TableCell align="center">Ações</S.TableCell>
            </S.TableRow>
          </S.TableHead>
          <S.TableBody>
            {transacoes.map((transacao) => (
              <S.TableRow
                key={transacao.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <S.TableCell align="center">
                  {format(new Date(transacao.data), "P", { locale: ptBR })}
                </S.TableCell>
                <S.TableCell align="center">{transacao.categoria}</S.TableCell>
                <S.TableCell align="center">
                  {transacao.categoria_tipo}
                </S.TableCell>
                <S.TableCell align="center">{transacao.descricao}</S.TableCell>
                <S.TableCell align="center">{transacao.valor}</S.TableCell>
                <S.TableCell align="center">
                  <S.Button
                    style={{ marginRight: "10px" }}
                    variant="outlined"
                    type="submit"
                    onClick={() => {
                      setSelectedIdEdit(transacao.id);
                      setOpenModalList(true);
                    }}>
                    <EditIcon />
                  </S.Button>
                  <S.Button
                    style={{ marginRight: "10px" }}
                    variant="outlined"
                    type="submit"
                    onClick={() => {
                      setSelectedIdDelete(transacao.id);
                      setOpenModalList(true);
                    }}>
                    <DeleteIcon />
                  </S.Button>
                </S.TableCell>
              </S.TableRow>
            ))}
          </S.TableBody>
        </S.Table>
      </S.TableContainer>
      {selectedIdEdit && (
        <TransacoesUpdate
          transacaoId={selectedIdEdit}
          openModalList={openModalList}
          closeModal={setOpenModalList}
          setSelectedIdEdit={setSelectedIdEdit}
          setUpdate={setUpdate}
        />
      )}
      {selectedIdDelete && (
        <TransacoesDelete
          transacaoId={selectedIdDelete}
          openModalList={openModalList}
          closeModal={setOpenModalList}
          setSelectedIdDelete={setSelectedIdDelete}
          setUpdate={setUpdate}
        />
      )}
    </>
  );
};

export default TransacoesList;
