import styled from "styled-components";

export const Link = styled.a`
  text-decoration: none;
  display: inline-block;
  color: #fcfeff;

  &::after {
    content: "";
    display: block;
    width: 0;
    height: 2px;
    background: #0275d8;
    transition: width 0.3s;
  }
  &:hover::after {
    width: 100%;
  }
`;
