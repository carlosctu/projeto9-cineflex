import { Link } from "react-router-dom";
import styled from "styled-components";
export default function Header() {
  return (
    <Link to="/">
      <Wrapper>CINEFLEX</Wrapper>
    </Link>
  );
}

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 67px;
  width: 100vw;
  background-color: #c3cfd9;
  color: #e8833a;
  font-size: 34px;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
`;
