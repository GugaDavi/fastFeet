import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MdAdd,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdMoreHoriz,
  MdSearch,
} from "react-icons/md";

import { PackageState, IPackage } from "~/store/modules/packages/types";
import { ApplicationState } from "~/store";
import {
  updatePageRequest,
  getPackagesByFilters,
  clearFilters,
  getPackagesRequest,
} from "~/store/modules/packages/actions";

import { Container, Finder, SearchButton, Page } from "./styles";
import Filter from "~/components/Filter";
import TemporaryAvatar from "~/components/TemporaryAvatar";
import PackageStatus from "~/components/PackageStatus";
import Actions from "../Actions";
import * as Pallet from "~/styles/colors";
import PackageView from "../ViewPackage";
import { PageAction } from "~/store/modules/generalTypes";

interface Props {
  handleNewPackage(): void;
}

const PackagesList: React.FC<Props> = ({ handleNewPackage }) => {
  const dispatch = useDispatch();
  const state = useSelector<ApplicationState, PackageState>(
    (state) => state.packages
  );
  const [page, setPage] = useState(state.page ?? 1);
  const [packages, setPackages] = useState(state.packages ?? []);
  const [searchPack, setSearchPack] = useState("");
  const [filter, setFilter] = useState(state.filter ?? "");
  const [openActions, setOpenActions] = useState(false);
  const [seletedPackage, setSelectedPackage] = useState<IPackage>();
  const [openViewer, setOpenViewer] = useState(false);

  useEffect(() => {
    dispatch(getPackagesRequest());
  }, []);

  useEffect(() => {
    if (state.packages) {
      setPackages(state.packages);
    }
    setPage(state.page);
    setFilter(state.filter);
  }, [state]);

  function handleChangePage(action: PageAction) {
    dispatch(updatePageRequest(action));
  }

  function handleSearchPackage() {
    dispatch(getPackagesByFilters(searchPack));
    setSearchPack("");
  }

  function handleClearFilter() {
    dispatch(clearFilters());
  }

  function handleOpenActions(pack: IPackage) {
    setSelectedPackage(pack);
    setOpenActions(!openActions);
  }

  function handleOpenViewer() {
    setOpenViewer(!openViewer);
  }

  return (
    <Container>
      <h2>Gerenciando encomendas</h2>
      <header>
        <Finder>
          <input
            type="text"
            placeholder="Buscar por encomendas"
            value={searchPack}
            onChange={(e) => setSearchPack(e.target.value)}
          />
          <SearchButton
            type="button"
            isEmpty={searchPack.length === 0}
            disabled={searchPack.length === 0}
            onClick={handleSearchPackage}
          >
            <MdSearch color={Pallet.white} size={24} />
          </SearchButton>
          <Filter filter={filter} onClick={handleClearFilter} />
        </Finder>

        <button type="button" onClick={handleNewPackage}>
          <MdAdd color={Pallet.white} size={24} />
          <span>NOVA ENCOMENDA</span>
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
          <th>Destinatário</th>
          <th>Entregador</th>
          <th>Cidade</th>
          <th>Estado</th>
          <th>Status</th>
          <th>Ações</th>
        </thead>
        <tbody>
          {packages.map((pack) => (
            <tr key={pack.id}>
              <td>#{pack.id}</td>
              <td>{pack.recipient.name}</td>
              <td className="deliverymanAvatar">
                <div>
                  {pack.deliveryman?.avatar?.url ? (
                    <img src={pack.deliveryman.avatar.url} alt="Avatar" />
                  ) : (
                    <TemporaryAvatar name={pack.deliveryman.name} />
                  )}

                  <span>{pack.deliveryman.name}</span>
                </div>
              </td>
              <td>{pack.recipient.address.city}</td>
              <td>{pack.recipient.address.state}</td>
              <td className="status">
                <PackageStatus pack={pack} />
              </td>
              <td className="actions">
                <button onClick={() => handleOpenActions(pack)}>
                  <MdMoreHoriz size={16} color="#C6C6C6" />
                </button>
                <Actions
                  view={handleOpenViewer}
                  open={openActions && seletedPackage?.id === pack.id}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <PackageView
        close={handleOpenViewer}
        openViewer={openViewer}
        pack={seletedPackage}
      />
    </Container>
  );
};

export default PackagesList;
