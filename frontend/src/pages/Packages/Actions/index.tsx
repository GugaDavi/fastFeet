import React from "react";
import { MdRemoveRedEye, MdModeEdit, MdDelete } from "react-icons/md";

import Modal from "~/pages/_layout/modal";

import * as Pallet from "~/styles/colors";

interface Props {
  open: boolean;
  view(): void;
}

const Actions: React.FC<Props> = ({ open, view }) => {
  return (
    <Modal open={open}>
      <button onClick={view}>
        <MdRemoveRedEye size={14} color={Pallet.primaryColor} />
        <span>Visualizar</span>
      </button>
      <hr />
      <button
        onClick={() => {
          console.log("Edit");
        }}
      >
        <MdModeEdit size={14} color={Pallet.TextStatusColor.doing} />
        <span>Editar</span>
      </button>
      <hr />
      <button
        onClick={() => {
          console.log("Delete");
        }}
      >
        <MdDelete size={14} color={Pallet.TextStatusColor.canceled} />
        <span>Excluir</span>
      </button>
    </Modal>
  );
};

export default Actions;
