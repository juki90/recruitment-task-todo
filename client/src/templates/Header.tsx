import React from "react";
import { theme } from "../theme";
import styled from "styled-components";
import Container from "./Container";
import { connect } from "react-redux";
import { logout as logoutAction } from "../actions";

const HeaderContainer = styled.header`
  background-color: ${theme.header_background};
  color: ${theme.header_text};
  width: 100%;
  height: 45px;
  margin-bottom: 15px;
`;

const ContainerInner = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Navigation = styled.nav`
  display: flex;
  margin-left: auto;
`;

const Logo = styled.a`
  display: block;
  font-size: 1.8em;
  font-weight: bold;
  text-decoration: none;
  color: ${theme.header_text};
  text-shadow: 1px 1px 2px #000;
  &:hover {
    color: #fff;
  }
`;

const Link = styled.a`
  display: block;
  font-size: 1.4em;
  text-decoration: none;
  color: ${theme.header_text};
  margin-left: 10px;
  text-shadow: 1px 1px 2px #000;
  &:hover {
    color: #fff;
  }
`;

interface HeaderProps {
  loggedAs: string;
  logout: () => void;
}

const Header: React.FC<HeaderProps> = ({ loggedAs, logout }) => {
  const logged = () => {
    return loggedAs && localStorage.getItem("token") ? loggedAs : "";
  };
  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (logged()) {
      e.preventDefault();
      localStorage.removeItem("token");
      logout();
    }
  };
  return (
    <HeaderContainer>
      <Container>
        <ContainerInner>
          <Logo href="/">TODO</Logo>
          <Navigation>
            <Link onClick={handleLogout} href="/login">
              {!logged() ? "LOGIN" : "LOGOUT"}
            </Link>
            <Link href="/register">REGISTER</Link>
          </Navigation>
        </ContainerInner>
      </Container>
    </HeaderContainer>
  );
};

const mapStateToProps = (state: { loggedAs: string }) => {
  const { loggedAs } = state;
  return {
    loggedAs,
  };
};

const mapDispatchToProps = (dispatch: (arg0: { type: string }) => any) => ({
  logout: () => dispatch(logoutAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
