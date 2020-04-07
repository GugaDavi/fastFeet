import styled from "styled-components";

interface ISortedColor {
  sortedColor: {
    text: string;
    back: string;
  };
}

export const Container = styled.div<ISortedColor>`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  text-align: center;
  background: ${props => props.sortedColor?.back ?? "#eee"};
  color: ${props => props.sortedColor?.text ?? "#999"};
  display: flex;
  align-items: center;
  justify-content: center;
`;
