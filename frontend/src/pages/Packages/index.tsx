import React, { useState } from "react";

import { Container } from "./styles";
import PackageForm from "./FormPackage";
import PackagesList from "./PackagesList";

export default function Packages() {
  const [openNewPackage, setOpenNewPackage] = useState(false);

  function handleNewPackage() {
    setOpenNewPackage(!openNewPackage);
  }

  return (
    <Container>
      {openNewPackage ? (
        <PackageForm handleNewPackage={handleNewPackage} />
      ) : (
        <PackagesList handleNewPackage={handleNewPackage} />
      )}
    </Container>
  );
}
