"use client";
import * as S from "./style.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MetasUpdate from "../MetasUpdate/index.jsx";
import MetasCreate from "@/components/Metas/MetasCreate";
import MetasDelete from "../MetasDelete/index.jsx";

export const MetasList = () => {
  const [metas, setMetas] = useState([]);
  const [openModalList, setOpenModalList] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [selectedIdEdit, setSelectedIdEdit] = useState();
  const [selectedIdDelete, setSelectedIdDelete] = useState();

  const [update, setUpdate] = useState(false);

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "",
  });

  useEffect(() => {
    const getMetas = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/metas", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMetas(response.data.data);
        setUpdate(false);
      } catch (error) {
        setNotification({
          open: true,
          message: error.response.data.message,
          severity: "error",
        });
      }
    };
    getMetas();
  }, [update]);

  return (
    <>
      <S.Button
        variant="contained"
        type="submit"
        onClick={() => setOpenModal(true)}>
        Nova meta
      </S.Button>
      <MetasCreate
        openModal={openModal}
        closeModal={setOpenModal}
        setUpdate={setUpdate}
      />
      <div style={{ gap: "20px", margin: "30px 0" }}></div>
      <S.TableContainer component={Paper}>
        <S.Table sx={{ minWidth: 650 }} aria-label="simple table">
          <S.TableHead>
            <S.TableRow>
              <S.TableCell align="center">Meta</S.TableCell>
              <S.TableCell align="center">Valor</S.TableCell>
              <S.TableCell align="center">Prazo</S.TableCell>
              <S.TableCell align="center">Ações</S.TableCell>
            </S.TableRow>
          </S.TableHead>
          <S.TableBody>
            {metas.map((meta) => (
              <S.TableRow
                key={meta.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <S.TableCell align="center">{meta.meta}</S.TableCell>
                <S.TableCell align="center">{meta.valor}</S.TableCell>
                <S.TableCell align="center">
                  {format(new Date(meta.prazo), "P", { locale: ptBR })}
                </S.TableCell>
                <S.TableCell align="center">
                  <S.Button
                    style={{ marginRight: "10px" }}
                    variant="outlined"
                    type="submit"
                    onClick={() => {
                      setSelectedIdEdit(meta.id);
                      setOpenModalList(true);
                    }}>
                    <EditIcon />
                  </S.Button>
                  <S.Button
                    style={{ marginRight: "10px" }}
                    variant="outlined"
                    type="submit"
                    onClick={() => {
                      setSelectedIdDelete(meta.id);
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
        <MetasUpdate
          metaId={selectedIdEdit}
          openModalList={openModalList}
          closeModal={setOpenModalList}
          setSelectedIdEdit={setSelectedIdEdit}
          setUpdate={setUpdate}
        />
      )}
      {selectedIdDelete && (
        <MetasDelete
          metaId={selectedIdDelete}
          openModalList={openModalList}
          closeModal={setOpenModalList}
          setSelectedIdDelete={setSelectedIdDelete}
          setUpdate={setUpdate}
        />
      )}
    </>
  );
};

export default MetasList;
