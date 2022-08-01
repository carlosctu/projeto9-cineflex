import styled from "styled-components";
export default function MovieSessionReferences() {
  const referenceInfo = [
    { color: "#8dd7cf", seatStatus: "Selecionado" },
    { color: "#c3cfd9", seatStatus: "Disponível" },
    { color: "#fbe192", seatStatus: "Indisponível" },
  ];
  return (
    <Wrapper>
      {referenceInfo.map((info, index) => {
        return (
          <Container key={index}>
            <SeatInfo color={info.color}></SeatInfo>
            {info.seatStatus}
          </Container>
        );
      })}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 34px;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  margin: 16px 0 40px 0;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 5px;
  font-size: 13px;
`;
const SeatInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 26px;
  height: 26px;
  font-size: 14px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  cursor: no-drop;
`;
