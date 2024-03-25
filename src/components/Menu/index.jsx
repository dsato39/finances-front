"use client";

import * as S from "./styles.jsx";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GridViewIcon from "@mui/icons-material/GridView";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import CategoryIcon from "@mui/icons-material/Category";
import ReceiptIcon from "@mui/icons-material/Receipt";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";

const drawerWidth = 240;

export const Menu = ({ children }) => {
  const router = useRouter();
  const doLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#e0e0e0",
          },
        }}
        variant="permanent"
        anchor="left">
        <S.Typography
          variant="h1"
          style={{
            marginTop: "40px",
            marginBottom: "40px",
            display: "flex",
            justifyContent: "center",
          }}>
          Finances
        </S.Typography>
        <Divider />
        <List>
          <ListItem disablePadding>
            <S.Link href="/dashboard">
              <ListItemButton>
                <ListItemIcon>
                  <GridViewIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </S.Link>
          </ListItem>
          <ListItem disablePadding>
            <S.Link href="/transacoes">
              <ListItemButton>
                <ListItemIcon>
                  <CompareArrowsIcon />
                </ListItemIcon>
                <ListItemText primary="Transações" />
              </ListItemButton>
            </S.Link>
          </ListItem>
          <ListItem disablePadding>
            <S.Link href="/metas">
              <ListItemButton>
                <ListItemIcon>
                  <SportsScoreIcon />
                </ListItemIcon>
                <ListItemText primary="Metas" />
              </ListItemButton>
            </S.Link>
          </ListItem>
          <ListItem disablePadding>
            <S.Link href="/categorias">
              <ListItemButton>
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Categorias" />
              </ListItemButton>
            </S.Link>
          </ListItem>
          <ListItem disablePadding>
            <S.Link href="/extrato">
              <ListItemButton>
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary="Extrato" />
              </ListItemButton>
            </S.Link>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={doLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Sair" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Menu;
