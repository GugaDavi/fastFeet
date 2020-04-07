import styled from "styled-components";

import * as Pallet from "~/styles/colors";

export const Container = styled.button`
  padding: 5px;
  display: flex;
  align-items: center;
  height: 32px;
  border: 0;
  border-radius: 12px;
  background: ${Pallet.BackgroundStatusColor.filter};
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);

  strong {
    color: ${Pallet.TextStatusColor.filter};
  }
`;
