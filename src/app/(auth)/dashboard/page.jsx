"use client";

import { useEffect } from "react";
import axios from "axios";
import BASE_URL from "@/api/index.js";
import CategoriesCreate from "@/components/Categories/CategoriesCreate";
import CategoriesUpdate from "@/components/Categories/CategoriesUpdate";
import MetasCreate from "@/components/Metas/MetasCreate";
import MetasUpdate from "@/components/Metas/MetasUpdate";
import TransacoesCreate from "@/components/Transacoes/TransacoesCreate";
import TransacoesUpdate from "@/components/Transacoes/TransacoesUpdate";

export const DashboardPage = () => {
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
        console.log(response.data.data);
      })
      .catch((error) => {
        window.location.href = "/login";
      });
  });
  return (
    <div>
      <h1>Dashboard</h1>
      {/* <CategoriesCreate /> */}
      {/* <CategoriesUpdate /> */}
      {/* <MetasCreate /> */}
      {/* <MetasUpdate /> */}
      {/* <TransacoesCreate /> */}
      {/* <TransacoesUpdate /> */}
    </div>
  );
};

export default DashboardPage;
