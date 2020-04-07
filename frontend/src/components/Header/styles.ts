import styled from "styled-components";

import * as Pallet from "~/styles/colors";

export const Container = styled.div`
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${Pallet.white};
  border-bottom: 1px solid ${Pallet.greyDDD};

  img {
    margin: 0px 30px 0px 30px;
    padding-right: 30px;
    border-right: 1px solid ${Pallet.greyEEE};
  }

  nav {
    display: flex;
    align-items: center;

    ul {
      display: flex;

      li {
        margin-right: 20px;
      }
    }
  }
`;

interface IHeaderItem {
  inFocus?: boolean;
}

export const HeaderItem = styled.li<IHeaderItem>`
  strong {
    color: ${props =>
      props.inFocus ? Pallet.primaryTextColor : Pallet.grey999};
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 30px;

  strong {
    margin-bottom: 5px;
    color: ${Pallet.secundTextColor};
  }

  button {
    border: 0;
    background: 0;
    color: ${Pallet.TextStatusColor.canceled};
  }
`;
