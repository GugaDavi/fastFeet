import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MdSearch,
  MdAdd,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdMoreHoriz,
} from "react-icons/md";

import {
  getDeliverymenRequest,
  getDeliverymanByFilter,
  clearFilters,
  updatePageRequest,
} from "~/store/modules/deliverymans/actions";
import { ApplicationState } from "~/store";
import {
  DeliverymanState,
  IDeliveryman,
} from "~/store/modules/deliverymans/types";
import { PageAction } from "~/store/modules/generalTypes";

import { Container, Finder, SearchButton, Page } from "./styles";
import * as Pallet from "~/styles/colors";
import Filter from "~/components/Filter";
import TemporaryAvatar from "~/components/TemporaryAvatar";
import Actions from "../Actions";

const RecipientsList = () => {
  const state = useSelector<ApplicationState, DeliverymanState>(
    (state) => state.deliveryman
  );
  const dispatch = useDispatch();

  const [searchDeliveryman, setSearchDeliveryman] = useState("");
  const [deliverymen, setDeliverymen] = useState<IDeliveryman[]>([]);
  const [filter, setFilter] = useState(state.filter);
  const [page, setPage] = useState(state.page);
  const [openActions, setOpenActions] = useState(false);
  const [selectedDeliveryman, setSelectedDeliveryman] = useState<
    IDeliveryman
  >();

  console.log(filter);

  useEffect(() => {
    dispatch(getDeliverymenRequest());
  }, []);

  useEffect(() => {
    if (state.deliverymen) {
      setDeliverymen(state.deliverymen);
    }
    setPage(state.page);
    setFilter(state.filter);
  }, [state]);

  function handleOpenActions(deliveryman: IDeliveryman) {
    setSelectedDeliveryman(deliveryman);
    setOpenActions(!openActions);
  }

  function handleSearchDeliveryman() {
    dispatch(getDeliverymanByFilter(searchDeliveryman));
    setSearchDeliveryman("");
    setOpenActions(false);
  }

  function handleNewDeliveryman() {}

  function handleClearFilter() {
    dispatch(clearFilters());
    setOpenActions(false);
  }

  function handleChangePage(action: PageAction) {
    dispatch(updatePageRequest(action));
    setOpenActions(false);
  }

  return (
    <Container>
      <h2>Gerenciando entregadores</h2>
      <header>
        <Finder>
          <input
            type="text"
            placeholder="Buscar por entregador"
            value={searchDeliveryman}
            onChange={(e) => setSearchDeliveryman(e.target.value)}
          />
          <SearchButton
            type="button"
            isEmpty={searchDeliveryman.length === 0}
            disabled={searchDeliveryman.length === 0}
            onClick={handleSearchDeliveryman}
          >
            <MdSearch color={Pallet.white} size={24} />
          </SearchButton>
          <Filter filter={filter} onClick={handleClearFilter} />
        </Finder>

        <button type="button" onClick={handleNewDeliveryman}>
          <MdAdd color={Pallet.white} size={24} />
          <span>NOVO ENTREGADOR</span>
        </button>
      </header>

      <Page>
        <button
          type="button"
          disabled={page === 1}
          onClick={() => handleChangePage(PageAction.PREV_PAGE)}
        >
          <MdKeyboardArrowLeft
            size={32}
            color={page === 1 ? Pallet.grey999 : Pallet.primaryColor}
          />
        </button>
        <strong>{page}</strong>
        <button
          type="button"
          onClick={() => handleChangePage(PageAction.NEXT_PAGE)}
        >
          <MdKeyboardArrowRight size={32} color={Pallet.primaryColor} />
        </button>
      </Page>

      <table>
        <thead>
          <th>ID</th>
          <th>Foto</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Ações</th>
        </thead>
        <tbody>
          {deliverymen.map((deliveryman) => (
            <tr key={deliveryman.id}>
              <td>#{deliveryman.id}</td>
              <td className="deliverymanAvatar">
                <div>
                  {deliveryman?.avatar?.url ? (
                    <img src={deliveryman.avatar.url} alt="Avatar" />
                  ) : (
                    <TemporaryAvatar name={deliveryman.name} />
                  )}
                </div>
              </td>
              <td>{deliveryman.name}</td>
              <td>{deliveryman.email}</td>
              <td className="actions">
                <button onClick={() => handleOpenActions(deliveryman)}>
                  <MdMoreHoriz size={16} color="#C6C6C6" />
                </button>
                <Actions
                  view={() => handleOpenActions(deliveryman)}
                  open={
                    openActions && deliveryman.id === selectedDeliveryman?.id
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default RecipientsList;
