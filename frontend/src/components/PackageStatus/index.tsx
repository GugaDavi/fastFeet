import React, { useEffect, useState } from "react";
import { IPackage } from "~/store/modules/packages/types";

import { Container } from "./styles";
import * as pallete from "~/styles/colors";

interface Props {
  pack: IPackage;
}

export interface StatusColor {
  text: string;
  back: string;
}

const PackageStatus: React.FC<Props> = ({ pack }) => {
  const [statusName, setStatus] = useState<string>("");
  const [colors, setColors] = useState<StatusColor>();

  useEffect(() => {
    function checkStatus() {
      if (pack.end_date) {
        setStatus("ENTREGUE");
        setColors({
          text: pallete.TextStatusColor.done,
          back: pallete.BackgroundStatusColor.done
        });
        return;
      }
      if (pack.start_date) {
        setStatus("RETIRADA");
        setColors({
          text: pallete.TextStatusColor.doing,
          back: pallete.BackgroundStatusColor.doing
        });
        return;
      }
      if (pack.canceled_at) {
        setStatus("CANCELADA");
        setColors({
          text: pallete.TextStatusColor.canceled,
          back: pallete.BackgroundStatusColor.canceled
        });
        return;
      }
      setStatus("PENDENTE");
      setColors({
        text: pallete.TextStatusColor.open,
        back: pallete.BackgroundStatusColor.open
      });
    }
    checkStatus();
  }, [pack]);

  return (
    <Container statusColor={colors}>
      <div></div>
      <strong>{statusName}</strong>
    </Container>
  );
};

export default PackageStatus;
