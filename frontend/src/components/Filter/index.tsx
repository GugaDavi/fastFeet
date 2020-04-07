import React from "react";
import { MdClose } from "react-icons/md";

import * as Pallet from "~/styles/colors";

import { Container } from "./styles";

interface Props {
  filter?: string;
  onClick(): void;
}

const Filter: React.FC<Props> = ({ filter, onClick }) => {
  if (filter) {
    return (
      <Container onClick={onClick}>
        <strong>{filter}</strong>
        <MdClose color={Pallet.TextStatusColor.filter} size={12} />
      </Container>
    );
  }

  return <div />;
};

export default Filter;
