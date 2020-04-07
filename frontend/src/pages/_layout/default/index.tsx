import React from "react";

import { Wrapper, Content } from "./styles";
import Header from "~/components/Header";

// eslint-disable-next-line react/prop-types
const Deafult: React.FC = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      <Content>{children}</Content>
    </Wrapper>
  );
};

export default Deafult;
