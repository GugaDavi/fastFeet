import React from "react";

import { Wrapper, Content } from "./styles";

// eslint-disable-next-line react/prop-types
const Auth: React.FC = ({ children }) => {
  return (
    <Wrapper>
      <Content>{children}</Content>
    </Wrapper>
  );
};

export default Auth;
