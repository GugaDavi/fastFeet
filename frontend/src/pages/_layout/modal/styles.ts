import styled from "styled-components";

import * as Pallet from "~/styles/colors";

interface IContainer {
  open: boolean;
}

export const Container = styled.div<IContainer>`
  position: absolute;
  border-radius: 4px;
  box-shadow: 0.5px 0.5px 1px rgba(0, 0, 0, 0.3);
  background: #fafafa;
  left: calc(50% - 50px);
  top: calc(50% + 20px);
  border-radius: 4px;
  padding: 15px;
  display: ${props => (props.open ? "block" : "none")};

  button {
    display: flex;
    align-items: center;
  }

  &::before {
    content: "";
    position: absolute;
    left: calc(50% - 10px);
    top: -10px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #fafafa;
  }

  hr {
    height: 0px;
    border: 0.5px solid #ccc;
    margin: 10px 0px;
  }

  span {
    font-size: 12px;
    color: ${Pallet.primaryTextColor};
    margin-left: 5px;
  }
`;
