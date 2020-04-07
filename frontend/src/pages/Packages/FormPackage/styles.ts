import styled from "styled-components";
import { darken } from "polished";

import * as Pallet from "~/styles/colors";

export const Container = styled.div`
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 20px;

    button {
      border: 0px;
      padding: 10px 24px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      margin-left: 15px;
      transition: all 0.2s linear;
      box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);

      span {
        margin-left: 5px;
      }
    }

    div {
      display: flex;
      align-items: center;
    }

    button.toBack {
      background: ${Pallet.greyCCC};
      color: ${Pallet.white};

      &:hover {
        background: ${darken(0.05, Pallet.greyCCC)};
      }
    }

    button.save {
      background: ${Pallet.primaryColor};
      color: ${Pallet.white};

      &:hover {
        background: ${darken(0.05, Pallet.primaryColor)};
      }
    }
  }

  form {
    padding: 30px;
    background: ${Pallet.white};
    border-radius: 4px;
    box-shadow: 0.5px 0.5px 1px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;

    hr {
      margin: 30px 0px;
      height: 0;
      border: 0.5px solid ${Pallet.greyEEE};
    }

    div {
      display: flex;
      align-self: stretch;
    }

    label {
      display: flex;
      flex-direction: column;
      flex: 1;

      span {
        font-size: 14px;
        line-height: 19px;
        font-weight: bold;
        margin-bottom: 15px;
      }
    }
  }
`;
