import styled from "styled-components";

export const Col = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${({ gb }) => (gb ? gb : "0px")};
`;
