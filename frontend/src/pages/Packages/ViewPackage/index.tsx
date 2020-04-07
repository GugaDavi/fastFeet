import React, { useMemo } from "react";
import { parseISO, format } from "date-fns";
import { MdCamera, MdClose } from "react-icons/md";

import { Container } from "./styles";
import Viewer from "~/components/Viewer";
import { IPackage } from "~/store/modules/packages/types";

import * as Pallet from "~/styles/colors";

interface Props {
  pack?: IPackage;
  openViewer: boolean;
  close(): void;
}

const PackageView: React.FC<Props> = ({ pack, openViewer, close }) => {
  const startDate = useMemo(() => {
    if (pack?.start_date) {
      const parsedDate = parseISO(pack.start_date);

      return format(parsedDate, "dd'/'MM'/'yyyy");
    }
  }, [pack]);
  const endDate = useMemo(() => {
    if (pack?.end_date) {
      const parsedDate = parseISO(pack.end_date);

      return format(parsedDate, "dd'/'MM'/'yyyy");
    }
  }, [pack]);

  return (
    <Viewer openView={openViewer}>
      <Container>
        <div>
          <h3>Informações da encomenda:</h3>
          <button type="button" onClick={close}>
            <MdClose size={18} color={Pallet.primaryColor} />
          </button>
        </div>
        <p>
          {pack?.recipient.address.street},{" "}
          {pack?.recipient.address.house_number}
        </p>
        <p>
          {pack?.recipient.address.city}, {pack?.recipient.address.state}
        </p>
        <p>{pack?.recipient.address.zip_code}</p>

        <hr />

        <h4>Datas:</h4>
        <p>
          <strong>
            Retirada: <span>{startDate}</span>
          </strong>
        </p>
        <p>
          <strong>
            Entrega: <span>{endDate}</span>
          </strong>
        </p>

        <hr />

        <h4>Assinatura do destinatário:</h4>

        {pack?.signature ? (
          <img src={pack.signature.url} alt="Signature" />
        ) : (
          <div className="signature">
            <MdCamera size={100} color="#ccc" />

            <strong>Sem assinatura</strong>
          </div>
        )}
      </Container>
    </Viewer>
  );
};

export default PackageView;
