"use client";
import * as S from "./style.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CategoriesCreate from "../CategoriesCreate/index.jsx";
import CategoriesUpdate from "../CategoriesUpdate/index.jsx";
import CategoriesDelete from "../CategoriesDelete/index.jsx";
import BASE_URL from "@/api/index.js";

export const CategoriasList = () => {
  const [categorias, setCategorias] = useState([]);
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
    const getCategorias = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/categories`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategorias(response.data.data);
        setUpdate(false);
      } catch (error) {
        setNotification({
          open: true,
          message: error.response.data.message,
          severity: "error",
        });
      }
    };
    getCategorias();
  }, [update]);

  return (
    <>
      <S.Button
        variant="contained"
        type="submit"
        onClick={() => setOpenModal(true)}>
        Nova Categoria
      </S.Button>
      <CategoriesCreate
        openModal={openModal}
        closeModal={setOpenModal}
        setUpdate={setUpdate}
      />
      <div style={{ gap: "20px", margin: "30px 0" }}></div>
      <S.TableContainer component={Paper}>
        <S.Table sx={{ minWidth: 650 }} aria-label="simple table">
          <S.TableHead>
            <S.TableRow>
              <S.TableCell align="center">Classificação</S.TableCell>
              <S.TableCell align="center">Categoria</S.TableCell>
              <S.TableCell align="center">Tipo</S.TableCell>
              <S.TableCell align="center">Ações</S.TableCell>
            </S.TableRow>
          </S.TableHead>
          <S.TableBody>
            {categorias.map((categoria) => (
              <S.TableRow
                key={categoria.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <S.TableCell align="center">
                  {categoria.classificacao}
                </S.TableCell>
                <S.TableCell align="center">{categoria.categoria}</S.TableCell>
                <S.TableCell align="center">{categoria.tipo}</S.TableCell>
                <S.TableCell align="center">
                  <S.Button
                    style={{ marginRight: "10px" }}
                    variant="outlined"
                    type="submit"
                    onClick={() => {
                      setSelectedIdEdit(categoria.id);
                      setOpenModalList(true);
                    }}>
                    <EditIcon />
                  </S.Button>
                  <S.Button
                    style={{ marginRight: "10px" }}
                    variant="outlined"
                    type="submit"
                    onClick={() => {
                      setSelectedIdDelete(categoria.id);
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
        <CategoriesUpdate
          categoriaId={selectedIdEdit}
          openModalList={openModalList}
          closeModal={setOpenModalList}
          setSelectedIdEdit={setSelectedIdEdit}
          setUpdate={setUpdate}
        />
      )}
      {selectedIdDelete && (
        <CategoriesDelete
          categoriaId={selectedIdDelete}
          openModalList={openModalList}
          closeModal={setOpenModalList}
          setSelectedIdDelete={setSelectedIdDelete}
          setUpdate={setUpdate}
        />
      )}
    </>
  );
};

export default CategoriasList;
