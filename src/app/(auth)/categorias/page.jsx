"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import CategoriesList from "@/components/Categories/CategoriesList";

export const CategoriaPage = () => {
  const [user, setUser] = useState({
    id: null,
  });
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
    axios
      .get("http://localhost:8080/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data.data);
      })
      .catch((error) => {
        window.location.href = "/login";
      });
  }, []);

  return (
    <div>
      <CategoriesList />
    </div>
  );
};

export default CategoriaPage;
