import { createGlobalStyle } from "styled-components";
import "react-toastify/dist/ReactToastify.css";

import * as colors from "./colors";

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  * {
    margin: 0px;
    padding: 0px;
    outline: 0px;
    box-sizing: border-box;
  }

  *:focus {
    outline: 0px;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    -webkit-font-smoothing: antialiased;
    color: ${colors.primaryTextColor}
  }

  body, input, button {
    font: 14px 'Roboto', sans-serif;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }

  input {
    padding: 12px 15px;
    border-radius: 4px;
    border: 1px solid #DDDDDD;
  }

  table {
    width: 100%;
    margin-top: 25px;
    border-collapse: separate;
    border-spacing: 0 20px;}
`;
