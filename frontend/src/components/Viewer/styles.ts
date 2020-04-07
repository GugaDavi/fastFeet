import styled from "styled-components";

interface IContainer {
  openView: boolean;
}

export const Container = styled.div<IContainer>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);

  display: ${props => (props.openView ? "flex" : "none")};
  align-items: center;
  justify-content: center;
`;
