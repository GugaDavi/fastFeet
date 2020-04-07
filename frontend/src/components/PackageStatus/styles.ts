import styled from "styled-components";

import * as Pallete from "~/styles/colors";

interface Itd {
  statusColor?: {
    text: string;
    back: string;
  };
}

export const Container = styled.div<Itd>`
  padding: 5px;
  display: flex;
  align-items: center;
  border-radius: 12px;
  background: ${props => props.statusColor?.back ?? "#eee"};

  div {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${props => props.statusColor?.text ?? Pallete.primaryTextColor};
    margin-right: 5px;
  }

  strong {
    color: ${props => props.statusColor?.text ?? Pallete.primaryTextColor};
  }
`;
