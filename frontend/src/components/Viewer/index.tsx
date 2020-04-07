import React from "react";

import { Container } from "./styles";

interface Props {
  openView: boolean;
}

const Viewer: React.FC<Props> = ({ children, openView }) => {
  return <Container openView={openView}>{children}</Container>;
};

export default Viewer;
