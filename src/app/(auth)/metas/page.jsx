"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import MetasList from "@/components/Metas/MetasList";
import BASE_URL from "@/api/index.js";

export const MetasPage = () => {
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
      .get(`${BASE_URL}/users/me`, {
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
      <MetasList />
    </div>
  );
};

export default MetasPage;
