import styled from "styled-components";

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${({ gb }) => (gb ? gb : "0px")};
  width: 100%;

`;
