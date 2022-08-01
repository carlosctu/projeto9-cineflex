import styled from "styled-components";
export default function MovieSessionTitle() {
  return <Wrapper>Selecione o(s) assentos(s)</Wrapper>;
}

const Wrapper = styled.div`
  margin-top: 67px;
  height: 110px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  line-height: 28px;
`;
