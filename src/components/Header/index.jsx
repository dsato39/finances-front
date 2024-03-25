"use client";
import * as S from "./style.jsx";

export const Header = () => {
  return (
    <S.AppBar position="static">
      <S.Toolbar>
        <S.Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Finances
        </S.Typography>
        <S.Button color="inherit" href="/login">
          Login
        </S.Button>
      </S.Toolbar>
    </S.AppBar>
  );
};

export default Header;
