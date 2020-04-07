import styled from "styled-components";
import { darken } from "polished";

import * as Pallet from "~/styles/colors";

export const Container = styled.div`
  header {
    margin-top: 34px;
    display: flex;
    justify-content: space-between;

    > button {
      border: 0;
      background: ${Pallet.primaryColor};
      box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
      color: #fff;
      display: flex;
      align-items: center;
      padding: 0px 15px;
      border-radius: 4px;
      transition: all 0.2s linear;

      span {
        margin-left: 5px;
      }

      &:hover {
        background: ${darken(0.05, Pallet.primaryColor)};
      }
    }
  }
  tr {
    text-align: center;
    background: ${Pallet.white};

    td {
      height: 60px;
    }

    td.deliverymanAvatar {
      div {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        margin: 0px;
        padding: 0px;
      }

      span {
        margin-left: 5px;
        text-align: center;
        line-height: 20px;
      }
    }

    td.status {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    td.actions {
      position: relative;
    }

    button {
      border: 0;
      background: none;
    }
  }
`;

export const Finder = styled.div`
  display: flex;
  align-items: center;

  input {
    width: 200px;
  }
`;

interface ISearchButton {
  isEmpty?: boolean;
}

export const SearchButton = styled.button<ISearchButton>`
  border: 0;
  background: ${Pallet.TextStatusColor.doing};
  border-radius: 50%;
  margin: 0px 5px;
  width: 40px;
  height: 40px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  transition: all 0.2s linear;
  opacity: ${props => (props.isEmpty ? 0.6 : 1)};

  &:disabled {
    cursor: not-allowed;
  }

  &:hover {
    background: ${darken(0.05, Pallet.TextStatusColor.doing)};
  }
`;

export const Page = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  strong {
    margin: 0px 10px;
    font-size: 20px;
    line-height: 23px;
  }

  button {
    border: 0;
    background: none;

    &:disabled {
      cursor: not-allowed;
    }
  }
`;
