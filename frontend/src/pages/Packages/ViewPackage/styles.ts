import styled from "styled-components";

export const Container = styled.div`
  background: #fff;
  border-radius: 4px;
  padding: 25px;

  width: 450px;

  p {
    margin: 5px 0px;
  }

  div {
    display: flex;
    justify-content: space-between;

    button {
      border: 0;
      background: none;
    }
  }

  hr {
    border: 0.5px solid #eee;
    margin: 10px 0px;
  }

  h4 {
    margin-bottom: 10px;
  }

  img {
    width: 100%;
  }

  div.signature {
    background: #eee;
    padding: 10px 0px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    strong {
      color: #999;
    }
  }
`;
