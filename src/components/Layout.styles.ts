import styled from "@emotion/styled";

const Layout = styled.div`
  height: 100%;
  width: 100vw;
`;
const Header = styled.header`
  height: 48px;
  background: #1a1a1a;
`;
const Navigation = styled.nav`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 16px;
  justify-content: space-between;
`;
const Main = styled.main`
  height: calc(100% - 48px - 92px);
  padding: 16px 0;
`;

const Footer = styled.footer`
  /* border: 1px solid red; */
  height: 92px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #b43919;
  border-radius: 16px 16px 0 0;
  padding: 0;
  /* padding: 0 16px; */
  > button {
    width: 100%;
  }
`;

const ButtonBlock = styled.div`
  display: flex;
  gap: 16px;
`;

export { Layout, Header, Main, Footer, Navigation, ButtonBlock };
