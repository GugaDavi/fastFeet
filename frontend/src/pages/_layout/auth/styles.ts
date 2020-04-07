import styled from "styled-components";
import { darken } from "polished";

import * as Pallet from "~/styles/colors";

export const Wrapper = styled.div`
  height: 100%;
  background: ${Pallet.primaryColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 360px;
  padding: 60px 30px;
  background: ${Pallet.white};
  border-radius: 4px;
  margin: 0 auto;
  box-shadow: 0px 0px 10px #00000033;

  img {
    display: block;
    margin: 0px;
    text-align: center;
    height: 44px;
    width: 250px;
    margin: 0 auto;
    margin-bottom: 40px;
  }

  form {
    strong {
      display: block;
      margin: 15px 0 10px;
      width: 100%;
    }

    input {
      width: 100%;
      margin-bottom: 5px;
    }

    span {
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
      color: ${Pallet.primaryColor};
      opacity: 0.6;
    }

    button {
      width: 100%;
      margin-top: 15px;
      padding: 12px 0px;
      border: none;
      color: ${Pallet.white};
      background: ${Pallet.primaryColor};
      border-radius: 4px;
      font-size: 16px;
      font-weight: bold;
      transition: 0.2s linear all;

      &:hover {
        background: ${darken(0.05, Pallet.primaryColor)};
      }
    }
  }
`;
