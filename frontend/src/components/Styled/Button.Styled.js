import styled from "styled-components";

export const Button = styled.button`
  background-color: #0275d8;
  color: #fcfeff;
  width: fit-content;
  height: 50px;
  border: none;
  padding: 7px;
  border-radius: 5px;
  font-weight: 500;
  margin-right: 20px;
  cursor: pointer;
  color: white;
  &:hover {
    background-color: #0274d891;
    font-weight: 500;
  }
  @media (max-width: 768px) {
    font-size: smaller;
    height: fit-content;
    font-weight: 300;
  }
`;
