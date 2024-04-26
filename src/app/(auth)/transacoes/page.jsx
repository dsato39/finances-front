"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "@/api/index.js";

import TransacoesList from "@/components/Transacoes/TransacoesList";

export const TransacoesPage = () => {
  const [user, setUser] = useState({
    id: null,
  });

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
      <TransacoesList />
    </div>
  );
};

export default TransacoesPage;
