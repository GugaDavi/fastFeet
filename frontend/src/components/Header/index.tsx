import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import logo from "~/assets/logo.png";
import * as Routes from "~/routes/constants_routes";
import { signOut } from "~/store/modules/auth/actions";

import { Container, HeaderItem, Profile } from "./styles";

const Header: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  function handleSingOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <nav>
        <Link to={Routes.packages}>
          <img src={logo} alt="logo" />
        </Link>
        <ul>
          <HeaderItem inFocus={location.pathname === Routes.packages}>
            <Link to={Routes.packages}>
              <strong>ENCOMENDAS</strong>
            </Link>
          </HeaderItem>
          <HeaderItem inFocus={location.pathname === Routes.deliverymans}>
            <Link to={Routes.deliverymans}>
              <strong>ENTREGADORES</strong>
            </Link>
          </HeaderItem>
          <HeaderItem inFocus={location.pathname === Routes.recipients}>
            <Link to={Routes.recipients}>
              <strong>DESTINATÁRIOS</strong>
            </Link>
          </HeaderItem>
          <HeaderItem inFocus={location.pathname === Routes.reports}>
            <Link to={Routes.reports}>
              <strong>PROBLEMAS</strong>
            </Link>
          </HeaderItem>
        </ul>
      </nav>
      <Profile>
        <strong>Admin FastFeet</strong>
        <button type="button" onClick={handleSingOut}>
          sair do sistema
        </button>
      </Profile>
    </Container>
  );
};

export default Header;
