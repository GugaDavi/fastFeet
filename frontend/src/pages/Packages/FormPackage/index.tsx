import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { MdKeyboardArrowLeft, MdCheck } from "react-icons/md";
import Select from "react-select";

import { Container } from "./styles";
import * as Pallet from "~/styles/colors";
import { getDeliverymenRequest } from "~/store/modules/deliverymans/actions";

interface Props {
  handleNewPackage(): void;
}

const FormPackage: React.FC<Props> = ({ handleNewPackage }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDeliverymenRequest());
  }, []);

  return (
    <Container>
      <header>
        <h2>Cadastro de encomendas</h2>

        <div>
          <button type="button" onClick={handleNewPackage} className="toBack">
            <MdKeyboardArrowLeft size={22} color={Pallet.white} />
            <span>VOLTAR</span>
          </button>
          <button type="button" onClick={handleNewPackage} className="save">
            <MdCheck size={22} color={Pallet.white} />
            <span>SALVAR</span>
          </button>
        </div>
      </header>

      <form>
        <div>
          <label htmlFor="">
            <span>Destinatário</span>
            <select name="" id=""></select>
          </label>

          <label htmlFor="">
            <span>Entregador</span>
            <select name="" id=""></select>
          </label>
        </div>

        <hr />

        <label htmlFor="">
          <span>Nome do produto</span>
          <input type="text" placeholder="Ex: Motocicleta" />
        </label>
      </form>
    </Container>
  );
};

export default FormPackage;
