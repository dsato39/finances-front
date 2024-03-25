"use client";

import { useEffect, useState } from "react";
import axios from "axios";

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
      <TransacoesList />
    </div>
  );
};

export default TransacoesPage;
