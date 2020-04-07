import React, { useState } from "react";

import { Container } from "./styles";
import DeliverymenList from "./DeliverymenList";

const Deliverymans: React.FC = () => {
  const [openNewDeliveryman, setOpenNewDeliveryman] = useState(false);

  function handleNewDeliveryman() {
    setOpenNewDeliveryman(!openNewDeliveryman);
  }

  return (
    <Container>
      <DeliverymenList />
    </Container>
  );
};

export default Deliverymans;
